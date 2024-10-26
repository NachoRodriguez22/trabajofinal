import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [id, setId] = useState(2)

    // Manejar la selección del archivo
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Manejar el envío del archivo
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Por favor, selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // "file" es el nombre que debe coincidir con el backend

        try {
            const response = await axios.post(config.backend_url + "upload/" + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

            setMessage('Archivo subido exitosamente');
        } catch (error) {
            console.error('Error al subir el archivo', error);
            setMessage('Error al subir el archivo');
        }
    };

    return (
        <div>
            <h2>Subir archivo</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Subir</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;