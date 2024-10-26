import React, {useEffect} from 'react'
import config from '../../../config.js'

export const Product = ({ nombre, imagen, descripcion, precio }) => {
    useEffect(() => {
            console.log()
            console.log(imagen);
            
    }, [])

    return (
        <>
            <h3>{nombre}</h3>
            <img src={config.backend_url + "images/" + imagen} alt="Imagen" />
            <p>{descripcion}</p>
            <span>{precio}</span>
        </>
    )
}
