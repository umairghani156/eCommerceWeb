import { Box, Container, Grid, Paper } from '@mui/material';
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

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsPending, getProductsSuccess } from '../../../redux/productsSlice';
import { useLocation } from 'react-router-dom';

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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const AllCategories = () => {
    const dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.products)
    const location = useLocation();
    console.log("lo", location.pathname);
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const [products2, setProducts] = useState([])

    const allProducts = async () => {


        dispatch(getProductsPending())
        try {
            const res = await axios.get("https://fakestoreapi.com/products");
            setProducts(res.data);
            dispatch(getProductsSuccess(res.data))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        allProducts()
    }, [])
    console.log(products);


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modalInfo">
                        <div className="modalWrapper1"></div>
                        <div className="modalWrapper2">
                            <p className='firstmodal'>Hello my name is hdsajdasjdkaskkjakdh</p>
                            <p>gardatdfgdadadasddugasd</p>
                            <Stack spacing={1} style={{ marginLeft: "7px" }}>
                                <Rating name="size-small" defaultValue={2} size="small" />
                            </Stack>
                            <p>Price 150/-</p>
                            <Button className='itemName'>ADD TO CART</Button>
                            <Stack spacing={2} direction="row">
                                <Button className='addCartBtn'>ADD TO CART</Button>
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
                                            <div style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img alt="example" style={{ height: "90%", width: "85%" }} src={product.image} />
                                            </div>}
                                    >
                                        <p>{product.price}</p>
                                        <p>{product.title.slice(0, 25)}...</p>
                                        <Stack spacing={1} style={{ marginLeft: "7px" }}>
                                            <Rating name="size-small" defaultValue={product.rating.rate} readOnly size="small" />
                                        </Stack>
                                        <Stack spacing={2} direction="row">
                                            <Button className='addCartBtn'>ADD TO CART</Button>
                                            <Button variant="outlined" className='viewDetailsBtn' onClick={handleOpen}>VIEW DETAILS</Button>
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

export default AllCategories