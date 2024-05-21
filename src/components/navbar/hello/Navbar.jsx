import './navbar.css';
import { Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { getProductsPending, getProductsSuccess } from '../../../redux/productsSlice';
import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));






const Navbar = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const location = useLocation();
    const locationCheck = location.pathname;
    const categories = ["All","electronics","jewellerry","men's clothing","women's clothing"];

    const categoryHandler =async (category) =>{
        setSelectedCategory(category)
    try{
        dispatch(getProductsPending())
    let api = "https://fakestoreapi.com/products";
       if(category == "All"){
            const res = await axios.get(api)
           dispatch(getProductsSuccess(res.data))
           navigate(`/products/category/${category.toLowerCase()}`)

       }else{
         let catergoryItem;
          if(category === "jewellerry"){
            catergoryItem = "jewelery"
          }else{
            catergoryItem = category
          }
          const res = await axios.get(`${api}/category/${catergoryItem}`)
          dispatch(getProductsSuccess(res.data))
          navigate(`/products/category/${category.toLowerCase()}`)
       }
       console.log(category);
    }catch(error){
        console.log(error);
    }
    }
    return (
        <div className='navbarContainerPar'>
            <Container className='navbar'>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6} sm={6} md={2} lg={5} xl={4} order={{ xs: 1, md: 1 }} style={{ display: "flex", alignItems: "center" }}>
                            <div className='storeName'>
                                <Link to="/" style={{textDecoration:"none", color:"white"}}>
                                <h3>SMIT STORE</h3>
                                </Link>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={8} lg={6} xl={6} order={{ xs: 3, md: 2 }} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <div className='categoryInfo'>
                                <ul>
                                   {
                                    categories.map((category)=>(
                                        <li className={selectedCategory === category ? "active":""} onClick={()=>categoryHandler(category)}>{category.toUpperCase()}</li>
                                    ))
                                   }
                                </ul>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={2} lg={1} xl={2} order={{ xs: 2, md: 3 }} >
                            <div className='cardIcon'>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={3} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default Navbar