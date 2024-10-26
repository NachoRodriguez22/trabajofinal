import formidable from 'formidable'
import Products from "../models/products.model.js";

export const uploadImage = async (req, res) => {
    const id = req.params.id
    const form = formidable({
        uploadDir: './public/images',  // Directorio de destino
        keepExtensions: true,  // Mantiene la extensión del archivo
        maxFileSize: 5 * 1024 * 1024,  // Tamaño máximo del archivo (5 MB en este caso)
        filename: "pepe.png",
    })

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({ status: "failure", message: "ocurrio un error" })
            return;
        }
        const response = await Products.update({ imagen_url: files.file[0].newFilename }, { where: { product_id: id } })
        console.log(response);
        res.json({ fields, files });
        
    });
}