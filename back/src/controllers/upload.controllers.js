import formidable from 'formidable';
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
            const imageUrl = files.file[0].newFilename; // Puedes cambiar esto según tus necesidades
            const response = await Products.update(
                { imagen_url: imageUrl }, 
                { where: { product_id: id } }
            );

            if (response[0] === 0) {
                return res.status(404).json({ status: "failure", message: "Producto no encontrado." });
            }

            res.json({ status: "success", message: "Imagen subida y producto actualizado.", imageUrl });
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ status: "failure", message: "Error al actualizar la base de datos." });
        }
    });
};
