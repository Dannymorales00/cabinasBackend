import { Request, Response } from "express";
import Shedules from "../models/shedules";
import ImagesHomes from "../models/imagesHome";
import { Model } from "sequelize";
import { v2 as cloudinary } from 'cloudinary';
import InfoContact from './../models/infoContact';
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

import { uploadArrayImageCloud, deleteArrayImageCloud } from '../helpers/cloudinaryImages';

const getHome = async (_req: Request, _res: Response) => {
  const shedules = await Shedules.findAll();
  const imagesHome = await ImagesHomes.findAll();
  const infoContact = await InfoContact.findOne();

  const home = {
    imagesHome,
    shedules,
    infoContact
  }
  return _res.send(home);
};



const postHome = async (_req: Request, _res: Response) => {
  const { body } = _req;

  try {
    const existRoom = await Shedules.findOne({ where: { numero: body.numero } });
    if (existRoom) {
      return _res.status(404).send({ msg: `ya existe una habitación con el numero: ${body.numero}` });
    }
    const room = await Shedules.create(body);
    const typeRoom = await InfoContact.create(body.tipoHabitacion);
    let images: Array<any> = [];

    for (const imagen of body.imagenes) {
      images.push(await ImagesHomes.create(imagen));
    }

    room.setDataValue('imagenes', images);
    room.setDataValue('tipoHabitacion', typeRoom.dataValues)
    return _res.send(room);

  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `no se registro la habitación` });
  }
};

const editHome = async (_req: Request, _res: Response) => {
  const { body } = _req;
  try {
    if (body.shedules) {
      for (const shedule of body.shedules) {
        const sheduleEdit = await Shedules.findByPk(shedule.id);
        if (sheduleEdit) {
          await sheduleEdit.update(shedule)
        }
      }
    }

    if (body.imagenes && (body.imagenes.borrarImagenes.length > 0 || body.imagenes.agregarImagenes.length > 0)) {
      const changedImgs = await changeImagesInCloudinary(body.imagenes)
      if (changedImgs.length === 0) {
        console.log({ msg: 'No se actualizaron las imágenes en Cloudinary' });
      }

    }
    if (body.infoContact) {
      const infoContact = await InfoContact.findByPk(body.infoContact.id);
      if (infoContact) {
        await infoContact.update(body.infoContact)
      }
    }

    return _res.send("se actualizo la informacióm");
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se editó el inicio` });
  }
};

const deleteHome = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  try {
    const userDelete = await Shedules.findByPk(id);
    if (!userDelete) {
      return _res.status(404).send({ msg: 'No se encuentra registrado esa habitación' });
    }
    // await userDelete.destroy();
    await userDelete.update({ estado: "Inactivo" })
    return _res.send(userDelete);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se elimino inicio` });
  }
};


const changeImagesInCloudinary = async (imagenes: any) => {
  let changedImgs: Model<any, any>[] | string[] = [];

    if (imagenes && imagenes.borrarImagenes.length > 0) {
      const deleteImage = await deleteArrayImageCloud(imagenes.borrarImagenes);
      if (deleteImage[0].result === "ok") {
        changedImgs = deleteImage;
      }
    }
    // const existingImages = await ImagesHomes.findOne({ where: { url: image.url } });
    // if (existingImages) {
    //   changedImgs.push(image)
    //   await cloudinary.uploader.destroy(image.url);
    // }

    //actualiza la primera imagen al primer registro
    if (imagenes && imagenes.agregarImagenes.length > 0) {
      const newImageUrls = await uploadArrayImageCloud(imagenes.agregarImagenes);
      const existingImages = await ImagesHomes.findOne();
      if (newImageUrls.length > 0 && existingImages) {
        await existingImages.update(newImageUrls[0]);
      }
      changedImgs = newImageUrls;
    }

    return changedImgs;
};

export { getHome, editHome, deleteHome, postHome };