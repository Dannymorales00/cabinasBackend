import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


const deleteImageCloud = async (image: any) => {
    try {
        // console.log(image);
        return await cloudinary.uploader.destroy(image);
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        return new Error('No se pudo eliminar la imagen de Cloudinary');
    }
};

const uploadImageCloud = async (image: any) => {
    try {
        return await cloudinary.uploader.upload(image,
            {
                resource_type: 'image',
                upload_preset: 'ml_default'
            })
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        return new Error('No se pudo subir la imagen de Cloudinary');
    }
}

const uploadArrayImageCloud = async (images: Array<any>) => {
    let uploadImages: Array<any> = [];
    for (const image of images) {
        try {
            const resultado = await uploadImageCloud(image.imgBase64);
            uploadImages.push(resultado)
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            return uploadImages;
        }
    }
    return uploadImages;
}

const deleteArrayImageCloud = async (images: Array<any>) => {
    let deleteImages: Array<any> = [];
    for (const image of images) {
        try {
            const publicIdMatch = image.url.match(/\/v\d+\/(.+?)\./);
            const publicId = publicIdMatch ? publicIdMatch[1] : null;
            if (publicId) {
                const resultado = await deleteImageCloud(publicId);
                deleteImages.push(resultado)
            }else{ console.error('Error al obtener el publicId de la imagen:');}
         
        } catch (error) {
            console.error('Error al borrar la imagen:', error);
        }
    }
    return deleteImages;
}

export { deleteArrayImageCloud, uploadImageCloud, deleteImageCloud, uploadArrayImageCloud }
