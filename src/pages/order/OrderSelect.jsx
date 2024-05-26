import { Box, Container, Grid,Button } from '@mui/material'
import './orderselect.css'
import Navbar from '../../components/navbar/hello/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSelectedProductsEmpty } from '../../redux/selectedProductsSlice';
import { useNavigate } from 'react-router-dom';

const OrderSelect = () => {
    const navigate = useNavigate()
    const { selectedProducts } = useSelector(state => state.selectedProducts);
    const dispatch = useDispatch()
    console.log("order",selectedProducts);
    let total = 0;
    selectedProducts && selectedProducts.forEach(element => {
        total +=element.price * (element.quantity === 0 ? 1:  element.quantity);
    });
    console.log(total);
    useEffect(()=>{

    },[selectedProducts])
   const backHandler = ()=>{
    try{
       dispatch(getSelectedProductsEmpty())
        navigate("/")
    }catch(error){
        console.log(error);
    }
   }
    
    return (
        <>
            <Navbar />
            <Container>
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className='gridContainer'>
                            <div className="cartDetailsCon">
                            <div className="orderWrapper">
                                <h2 style={{ textAlign: "center" }}>THANK YOU!</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aliquid blanditiis alias veritatis perferendis. Repudiandae quibusdam explicabo ducimus laboriosam sunt.</p>
                            </div>
                            <div className="productsDetail" key={Date.now()}>
                                <div className="productTitle">
                                    <p>Products</p>
                                    <p>Price</p>
                                </div>
                            {selectedProducts.map((product)=>{
                              return  (<div className="productTitle2">
                                <p>{product.quantity === 0 ? 1:product.quantity}x{product.title.slice(0,10)}</p>
                                <p>${product?.price * (product.quantity === 0 ? 1:product.quantity)}</p>
                            </div>)
})    
                            }
                            </div>
                            <div className="totalWrapper">
                                <p>TOTAL</p>
                                <p>${total}</p>
                            </div>
                            </div>
                            <Button className='backBtn' onClick={backHandler}>Back to Products</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default OrderSelect