import { Box, Container, Grid, Paper } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import './allCategories.css';
import { styled } from '@mui/material/styles';
import { Card } from 'antd';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


import axios from 'axios';

import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsPending, getProductsSuccess } from '../../../redux/productsSlice';
import { useLocation } from 'react-router-dom';
import { getProductFailure, getProductSuccess } from '../../../redux/productSlice';
import { getSelectedProductsPending, getSelectedProductsSuccess } from '../../../redux/selectedProductsSlice';

import 'react-toastify/dist/ReactToastify.css';
const { Meta } = Card;



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: "4px"
};
const AllCategories = () => {
    const dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.products)

    const { product, loader } = useSelector(state => state.product);
    const { selectedProducts } = useSelector(state => state.selectedProducts);

    console.log("product", product);

    const location = useLocation();
    console.log("lo", location.pathname);
    const [open, setOpen] = useState(false);
    const [products2, setProducts] = useState([])


    const handleOpen = () => {

    };
    const handleClose = () => {
        setOpen(false);
    };
    const productHandler = (id) => {
        setOpen(true);
        try {
            let singleProduct = products.find((product) => product.id === id)
            console.log("id", singleProduct);
            dispatch(getProductSuccess(singleProduct))
        } catch (error) {
            dispatch(getProductFailure(error.message));
        }
    }

    const selectedProductsHandler = (id) => {
        console.log("run");
        dispatch(getSelectedProductsPending())
        try {
            const selectedProduct = products.find((product) => product.id === id)
            console.log("sel", selectedProduct);
            dispatch(getSelectedProductsSuccess([...selectedProducts, selectedProduct]))
            const productName = selectedProduct.title.slice(0, 10)
           
            toast.success(`${productName}.. added successfully!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error) {
            console.log(error);
        }
    }

    const allProducts = async () => {


        dispatch(getProductsPending())
        try {
            const res = await axios.get("https://fakestoreapi.com/products");

            dispatch(getProductsSuccess(res.data))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (products.length == 0) {

            allProducts()
        }
    }, []);

    const addToCartHandler = (data) => {
        try {
            dispatch(getSelectedProductsSuccess([...selectedProducts, data]));
            toast.success(`${data?.title?.slice(0, 10)}.. added successfully!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
         <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
/>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modalInfo">
                        <div className="modalWrapper1">
                            <img className='productImageS' src={product?.image} alt="" />
                        </div>
                        <div className="modalWrapper2">
                            <p className='firstmodal'>{product?.title}</p>
                            <p className='secondModalP'>{product?.description?.slice(0, 100)}</p>
                            <Stack spacing={1} style={{ marginLeft: "7px" }}>
                                <Rating name="size-small" defaultValue={product?.rating?.rate} readOnly size="small" />
                            </Stack>
                            <p>Rs {product?.price}/-</p>
                            <Button className='itemName'>{product?.category}</Button>
                            <Stack spacing={2} direction="row">
                                <Button className='addCartBtn' onClick={() => addToCartHandler(product)}>ADD TO CART</Button>
                                <Button variant="outlined" className='viewDetailsBtn' >BUY NOW</Button>
                            </Stack>
                        </div>

                    </div>
                </Box>
            </Modal>
           
            <Container className='cardsContainer'>


                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                        {loading ? (<div className='loader'>
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                                <CircularProgress color="success" />
                            </Stack>
                        </div>)
                            :
                            products?.map((product, ind) => (
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={product.id} className='singleCard'>
                                    <Card
                                        hoverable
                                        className='cardItem'
                                        style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
                                        cover={
                                            <div style={{ height: "300px", width: "100%", display: "flex", objectFit: "cover", justifyContent: "center", alignItems: "center" }}>
                                                <img alt="example" style={{ height: "85%", width: "85%" }} src={product.image} />
                                            </div>}
                                    >
                                        <p>{product.price}</p>
                                        <p>{product.title.slice(0, 25)}...</p>
                                        <Stack spacing={1} style={{ marginLeft: "7px" }}>
                                            <Rating name="size-small" defaultValue={product.rating.rate} readOnly size="small" />
                                        </Stack>
                                        <Stack spacing={2} direction="row">
                                            <Button className='addCartBtn' onClick={() => selectedProductsHandler(product?.id)}>ADD TO CART</Button>
                                            <Button variant="outlined" className='viewDetailsBtn' onClick={() => productHandler(product?.id)}>VIEW DETAILS</Button>
                                        </Stack>
                                    </Card>
                                </Grid>))
                        }
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default AllCategories;