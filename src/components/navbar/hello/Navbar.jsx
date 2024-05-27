import './navbar.css';
import { Box, Container, Grid, Paper, Drawer, Button, List, ListItem, ListItemText, Alert } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsPending, getProductsSuccess } from '../../../redux/productsSlice';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { decrementQuantity, deleteProduct, incrementQuantity } from '../../../redux/selectedProductsSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));






const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    console.log("width",windowWidth);
    const [count, setCount] = useState(0);
    const [isMenu, setIsMenu] = useState(false)
    const [isOpen, setOpen ] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const locationCheck = location.pathname;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { selectedProducts } = useSelector(state => state.selectedProducts);
    console.log("selected hey", selectedProducts);


    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };
    const categories = ["All", "electronics", "jewellerry", "men's clothing", "women's clothing"];

    const categoryHandler = async (category) => {
        setSelectedCategory(category)
        try {
            dispatch(getProductsPending())
            let api = "https://fakestoreapi.com/products";
            if (category == "All") {
                const res = await axios.get(api)
                dispatch(getProductsSuccess(res.data))
                navigate(`/products/category/${category.toLowerCase()}`)

            } else {
                let catergoryItem;
                if (category === "jewellerry") {
                    catergoryItem = "jewelery"
                } else {
                    catergoryItem = category
                }
                const res = await axios.get(`${api}/category/${catergoryItem}`)
                dispatch(getProductsSuccess(res.data))
                navigate(`/products/category/${category.toLowerCase()}`)
            }
            console.log(category);
        } catch (error) {
            console.log(error);
        }
    }
    const decrementHandler = (id)=>{
        console.log("increment",id);
        dispatch(decrementQuantity(id))
    }

    const incrementHandler =(id)=>{
        console.log("increment",id);

       dispatch(incrementQuantity(id))
    }
    const deleteHandler = (id)=>{
        console.log("id",id);
        dispatch(deleteProduct(id))
    }

    const CheckOutHandler = ()=>{
       navigate("/checkout")
    }
    console.log("sele",selectedProducts);

    
    useEffect(() => {
        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            setWindowWidth(newWindowWidth);
      
            if (newWindowWidth > 580) {
              setIsMenu(true);
            }
            else if(newWindowWidth < 580){
            setIsMenu(false);
            }
        };
       
        
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      const menuHandler = ()=>{
        if(windowWidth <= 580){
        setIsMenu(!isMenu)
        }
    }
    return (
        <>  
                <Drawer anchor="right"  open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {  selectedProducts && selectedProducts.length > 0 ?
                <List >
                    {selectedProducts?.map((select) => (

                        <ListItem className='orderContainer'>
                            <div className='orderContainer2'>
                                <div style={{width:"50px"}}>
                                <div className="orderImage">
                                    <img src={select?.image} alt="" />
                                </div>
                                </div>
                                <div className="descWrapper">
                                    <p className="shirtName">{select?.title}</p>
                                    <p className="categoryPrice">Rs {select?.price}/-</p>
                                    <div className="quantyWrapper">
                                        <div className="addAndRemoveWrapper">
                                            QTY:
                                            <button className='orderButtons' onClick={()=>decrementHandler(select?.id)}>
                                                <RemoveOutlinedIcon fontSize='small' />
                                            </button>
                                            <span>{select?.quantity}</span>
                                            <button className='orderButtons' onClick={()=>incrementHandler(select?.id)}>
                                                <AddOutlinedIcon fontSize='small' />
                                            </button>
                                            <button className='dltButton' onClick={()=>deleteHandler(select?.id)}>
                                                <DeleteOutlineOutlinedIcon fontSize='small' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ListItem>
                    ))
                    }
                    <Button className="checkoutBtn" onClick={CheckOutHandler}>Checkout</Button>

                </List>:
            <div className='noItemPar'>
                <div className="noItemWrapper">
                <Alert severity="warning" style={{ margin: '50px' }}>
               Your cart is Empty
        </Alert>
                </div>
            </div>
            }
            </Drawer>
            <div className='navbarContainerPar'>
                <Container className='navbar'>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6} sm={6} md={2} lg={5} xl={4} order={{ xs: 1, md: 1 }} style={{ display: "flex", alignItems: "center" }}>
                                <div className='storeName' key={Date.now()+"ab"}>
                                    <MenuOutlinedIcon className='menuChangingIcon' sx={{fontSize:"2.5rem",cursor:"pointer"}} onClick={menuHandler}/>
                                    <Link to="/" style={{ textDecoration: "none", color: "white" }} className='storeNameLink'>
                                        <h3 >SWIFTCART STORE</h3>
                                    </Link>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={6} xl={6} order={{ xs: 3, md: 2 }} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <div className='categoryInfo'>
                                    <ul className={`categoryList ${isMenu ? "other":"mobile"}`}>
                                        { isMenu &&
                                            categories.map((category) => (
                                                <li className={selectedCategory === category ? "active" : ""} onClick={() => categoryHandler(category)} tabindex="0">{category.toUpperCase()}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={2} lg={1} xl={2} order={{ xs: 2, md: 3 }} >
                                <div className='cardIcon'>
                                    <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                                        <StyledBadge badgeContent={selectedProducts.length} color="secondary" >
                                            <ShoppingCartIcon style={{color:"#fff"}}/>
                                        </StyledBadge>
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default Navbar
