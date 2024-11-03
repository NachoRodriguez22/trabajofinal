import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import BackButton from '../../common/Volver';

export const CreateProduct = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        descripcion: '',
        price: '',
        stock: '',
        category_id: '',
        brand_id: ''
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, brandsRes] = await Promise.all([
                    axios.get(`${config.backend_url}categories`),
                    axios.get(`${config.backend_url}brands`)
                ]);
                setCategories(categoriesRes.data);
                setBrands(brandsRes.data);
            } catch (error) {
                console.error("Error al obtener categorías y marcas:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productResponse = await axios.post(
                `${config.backend_url}products`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            const product_id = productResponse.data.product_id;
            navigate(`/img-upload/${product_id}`);
        } catch (error) {
            console.error("Error al crear el producto:", error.response ? error.response.data.message : error.message);
        }
    };

    return <>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField
                required
                id="product_name"
                label="Nombre"
                value={formData.product_name}
                onChange={handleChange}
            />
            <TextField
                id="descripcion"
                label="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
            />
            <TextField
                required
                id="price"
                label="Precio"
                type="number"
                value={formData.price}
                onChange={handleChange}
            />
            <TextField
                required
                id="stock"
                label="Stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
            />

            <FormControl required sx={{ m: 1, width: '25ch' }}>
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                    labelId="category-label"
                    id="category_id"
                    label="Categoría"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat.category_id} value={cat.category_id}>
                            {cat.category_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl required sx={{ m: 1, width: '25ch' }}>
                <InputLabel id="brand-label">Marca</InputLabel>
                <Select
                    labelId="brand-label"
                    id="brand_id"
                    label="Marca"
                    value={formData.brand_id}
                    onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                >
                    {brands.map((brand) => (
                        <MenuItem key={brand.brand_id} value={brand.brand_id}>
                            {brand.brand_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Crear Producto
            </Button>
        </Box>
        <BackButton />
    </>
};
