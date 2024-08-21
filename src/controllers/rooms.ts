import { Request, Response } from "express";
import Habitacion from "../models/room";
import Imagen from "../models/image";
import { v2 as cloudinary } from 'cloudinary';
import { Model } from "sequelize";
const fs = require('fs').promises;
const os = require('os');
const path = require('path');
// import TypeRoom from '../models/typesRooms';
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getRooms = async (_req: Request, _res: Response) => {
  const rooms = await Habitacion.findAll({ where: { 'estado': 'Activo' } });

  for (const room of rooms) {
    const images = await Imagen.findAll({ where: { numeroHabitacion: room.getDataValue('numero') } });
    room.dataValues.imagenes = images; // Agrega las imágenes a cada habitación
  }
  return _res.send(rooms);
};

const getRoomsAdm = async (_req: Request, _res: Response) => {
  const rooms = await Habitacion.findAll();

  for (const room of rooms) {
    const images = await Imagen.findAll({ where: { numeroHabitacion: room.getDataValue('numero') } });
    room.dataValues.imagenes = images; // Agrega las imágenes a cada habitación
  }
  return _res.send(rooms);
};

const getRoom = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const room = await Habitacion.findByPk(id);

  if (room) {
    const images = await Imagen.findAll({ where: { numeroHabitacion: room.getDataValue('numero') } });
    room.dataValues.imagenes = images; // Agrega las imágenes a cada habitación

    // const typesRoom = await TypeRoom.findOne({ where: { numeroHabitacion: room.getDataValue('numero') } });
    // room.dataValues.tipoHabitacion = typesRoom; // Agrega el tipo a cada habitación

    return _res.send(room)
  } else {
    return _res.status(404).send({ msg: `no existe una habitación con el id: ${id}` });
  }
};

const postRoom = async (_req: Request, _res: Response) => {
  const { body } = _req;

  try {
    const existRoom = await Habitacion.findOne({ where: { numero: body.numero } });
    if (existRoom) {
      return _res.status(404).send({ msg: `Ya existe una habitación con el número: ${body.numero}` });
    }

    const urls = await uploadImgsCloudinary(body.imagenes);

    if (urls.length === 0) {
      return _res.status(404).send({ msg: 'No se guardaron las imágenes en Cloudinary' });
    }

    const room = await Habitacion.create(body);
    const images = [];

    for (const url of urls) {
      images.push(await Imagen.create({ numeroHabitacion: body.numero, url: url }));
    }

    room.setDataValue('imagenes', images);
    return _res.send(room);
  } catch (error) {
    console.error(error);
    return _res.status(404).send({ msg: `No se registró la habitación` });
  }
};

const editRoom = async (_req: Request, _res: Response) => {
  const { body } = _req;
  const { id } = _req.params;
  try {
    const roomEdit = await Habitacion.findByPk(id);
    if (!roomEdit) {
      return _res.status(404).send({ msg: 'No se encuentra registrado esa habitación' });
    }

    if (body.imagenes.length > 0 && (body.imagenes[1].borrarImagenes.length > 0 || body.imagenes[0].agregarImagenes.length > 0)) {
      const changedImgs = await changeImagesInCloudinary(body.numero, body.imagenes)
      if (changedImgs.length === 0) {
        return _res.status(404).send({ msg: 'No se actualizaron las imágenes en Cloudinary' });
      }
    }
    await roomEdit.update(body)
    return _res.send(roomEdit);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se editó la habitación` });
  }
};

const deleteRoom = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const tokenData: any = _req.headers['tokenData'];
  try {
    const roomDelete = await Habitacion.findByPk(id);
    if (!roomDelete) {
      return _res.status(404).send({ msg: 'No se encuentra registrado esa habitación' });
    }

    if (tokenData.tipo != "Administrador") {
      return _res.status(404).send({ msg: `solo un adminstrador puede eliminar a una habitación` });
    }

    await Imagen.destroy({
      where: {
        numeroHabitacion: roomDelete.dataValues.numero
      }
    });
    await roomDelete.destroy();
    // await roomDelete.update({ estado: "Inactivo" })
    return _res.send(roomDelete);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se elimino la habitación` });
  }
};

// Importa la biblioteca fs con promesas
async function uploadImgsCloudinary(images: any) {
  const uploadedUrls = [];
  for (const image of images) {
    const buffer = Buffer.from(image.imgBase64.split(',')[1], 'base64');
    try {
      // Crea un archivo temporal con el contenido del buffer
      const tempFilePath = path.join(os.tmpdir(), 'temp_image.jpg');
      await fs.writeFile(tempFilePath, buffer);
      const result = await cloudinary.uploader.upload(tempFilePath, {
        // Opciones de carga si es necesario
      });
      uploadedUrls.push(result.secure_url);
      // Borra el archivo temporal después de la carga
      await fs.unlink(tempFilePath);
    } catch (error) {
      console.error('Error al subir una imagen a Cloudinary:', error);
    }
  }
  return uploadedUrls;
}


const changeImagesInCloudinary = async (roomNumber: number, imagenes: any) => {
  let changedImgs: Model<any, any>[] | string[] = [];
  try {
    if (imagenes.length > 0 && imagenes[1].borrarImagenes.length > 0) {
      for (const image of imagenes[1].borrarImagenes) {
        console.log(image);
        const existingImages = await Imagen.findOne({ where: { url: image.url } });
        if (existingImages) {
          changedImgs.push(image)
          await cloudinary.uploader.destroy(image.url);
          await existingImages.destroy();
        }
      }
    }


    if (imagenes.length > 0 && imagenes[0].agregarImagenes.length > 0) {
      const newImageUrls = await uploadImgsCloudinary(imagenes[0].agregarImagenes);
      changedImgs = newImageUrls;
      for (const url of newImageUrls) {
        await Imagen.create({ numeroHabitacion: roomNumber, url: url });
      }
    }
    return changedImgs;

  } catch (error) {
    console.error('Error al cambiar las imágenes en Cloudinary:', error);
    return changedImgs;
  }
};


export { getRooms, getRoomsAdm, getRoom, editRoom, deleteRoom, postRoom };