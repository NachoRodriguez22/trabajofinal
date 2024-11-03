import formidable from 'formidable';
import path from 'path';
import fs from 'fs'; // Asegúrate de importar fs para manejar el sistema de archivos
import Products from '../models/products.model.js';

export const uploadImage = async (req, res) => {
    const id = req.params.id;
    const form = formidable({
        uploadDir: './public/images',  // Directorio de destino
        keepExtensions: true,  // Mantiene la extensión del archivo
        maxFileSize: 5 * 1024 * 1024,  // Tamaño máximo del archivo (5 MB)
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ status: "failure", message: "Ocurrió un error al procesar la carga." });
        }

        // Verifica si el archivo fue subido
        if (!files.file || files.file.length === 0) {
            return res.status(400).json({ status: "failure", message: "No se subió ningún archivo." });
        }

        try {
            const originalFileName = files.file[0].originalFilename; // Nombre original del archivo
            const fileExtension = path.extname(originalFileName); // Extensión del archivo
            const newFileName = `product_${id}_${Date.now()}${fileExtension}`; // Nuevo nombre

            // Mueve el archivo a la ubicación deseada con el nuevo nombre
            const oldPath = files.file[0].filepath; // Ruta temporal del archivo
            const newPath = path.join('./public/images', newFileName); // Nueva ruta con el nuevo nombre

            // Mueve el archivo a la nueva ubicación
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error("Error al mover el archivo:", err);
                    return res.status(500).json({ status: "failure", message: "Error al guardar la imagen." });
                }
            });

            // Actualiza la base de datos con el nuevo nombre de imagen
            const response = await Products.update(
                { imagen_url: newFileName },
                { where: { product_id: id } }
            );

            if (response[0] === 0) {
                return res.status(404).json({ status: "failure", message: "Producto no encontrado." });
            }

            res.json({ status: "success", message: "Imagen subida y producto actualizado.", imageUrl: newFileName });
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ status: "failure", message: "Error al actualizar la base de datos." });
        }
    });
};
