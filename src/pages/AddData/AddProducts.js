import { Button, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import useStyles from '../utilities/style';
import axios from 'axios'



const AddProducts = () => {
    const {register, handleSubmit, reset, control, formState:{errors} } = useForm();
    const onSubmit = data =>{
        console.log('fuch you')
        axios.post('https://powerful-meadow-17770.herokuapp.com/products', data)
        .then(res =>{
            if(res.data.insertedId){
                alert('Product Successfully addeded')
            } else{
                alert('nothing happened')
            } 
        })
        reset()
    };

    const classes = useStyles()
    const {addProduct} = classes
     const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
      };
    
    return (
       
            <div className={addProduct}>
                <Typography>Add a new Products</Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <List className={classes.addProduct} sx={{display:'flex', flexWrap:'wrap'}}>
                        <ListItem>
                            <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Name"
                                inputProps={{ type: 'name' }}
                                error={Boolean(errors.name)}
                                helperText={
                                    errors.name
                                    ? errors.name.type === 'minLength'
                                        ? 'Name length is more than 1'
                                        : 'Name is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="description"
                                label="Description"
                                inputProps={{ type: 'description' }}
                                error={Boolean(errors.description)}
                                helperText={
                                    errors.description
                                    ? errors.description.type === 'minLength'
                                        ? 'Description length is more than 1'
                                        : 'Description is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                       
                        
                        <ListItem>
                            <Controller
                            name="image"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="image"
                                label="Image Link"
                                inputProps={{ type: 'text' }}
                                error={Boolean(errors.image)}
                                helperText={
                                    errors.image
                                    ? errors.image.type === 'minLength'
                                        ? 'Image length is more than 1'
                                        : 'Image is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="rating"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 1,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="rating"
                                label="Rating"
                                inputProps={{ type: 'rating' }}
                                error={Boolean(errors.rating)}
                                helperText={
                                    errors.rating   
                                    ? errors.rating.type === 'minLength'
                                        ? 'Rating length is more than 1'
                                        : 'Rating is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="slug"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="slug"
                                label="Slug/Unique name"
                                inputProps={{ type: 'slug' }}
                                error={Boolean(errors.slug)}
                                helperText={
                                    errors.slug
                                    ? errors.slug.type === 'minLength'
                                        ? 'Description length is more than 1'
                                        : 'Description is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="type"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="type"
                                label="Type"
                                inputProps={{ type: 'type' }}
                                error={Boolean(errors.type)}
                                helperText={
                                    errors.type
                                    ? errors.type.type === 'minLength'
                                        ? 'Type length is more than 1'
                                        : 'Type is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="numReviews"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="numReviews"
                                label="Number of reviews"
                                inputProps={{ type: 'numReviews' }}
                                error={Boolean(errors.numReviews)}
                               
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="brand"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="brand"
                                label="Product Brand"
                                inputProps={{ type: 'brand' }}
                                error={Boolean(errors.brand)}
                                helperText={
                                    errors.brand    
                                    ? errors.brand.type === 'minLength'
                                        ? 'Brand length is more than 1'
                                        : 'Brand is required'
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="countInStock"
                            control={control}
                            defaultValue=""
                            rules={{
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="countInStock"
                                label="Present stock"
                                inputProps={{ type: 'countInStock' }}
                                error={Boolean(errors.stock)}
                                
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                            name="price"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="price"
                                label="Enter product price"
                                inputProps={{ type: 'number' }}
                                error={Boolean(errors.price)}
                                helperText={
                                    errors.price
                                    ? errors.price.type === ''
                                        ? 'Price length is more than 1'
                                        : ''
                                    : ''
                                }
                                {...field}
                                    ></TextField>
                            )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                        <FormControl fullWidth>
                            <InputLabel defaultValue='' id="demo-simple-select-label">Category</InputLabel>
                            <Select
                        
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            {...register("category")}
                            onChange={handleChange}
                            >
                            <MenuItem value="Meat">Meat</MenuItem>
                            <MenuItem value="Cooking">Cooking</MenuItem>
                            <MenuItem value="Dairy">Dairy</MenuItem>
                            <MenuItem value="Beverages">Beverages</MenuItem>
                            <MenuItem value="BeautyHealth">BeautyHealth</MenuItem>
                            <MenuItem value="Fruits">Fruits</MenuItem>
                            <MenuItem value="Vegitables">Vegitables</MenuItem>
                            <MenuItem value="Fish">Fish</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                            
                            </Select>
                        </FormControl>
                        </ListItem>
                        <Button onClick={handleSubmit(onSubmit)} variant="contained" type="submit" fullWidth color="primary">
                            Add a new item
                        </Button>
                    </List>
                </form>
            </div>
       
    )
}
export default AddProducts;