import { Box, Container, Grid } from '@mui/material'
import { ToastContainer, toast } from "react-toastify";

import React, { useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./login.css"
import Navbar from '../../components/navbar/hello/Navbar';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword ,auth, signInWithEmailAndPassword} from '../../config/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px white inset !important',
                        WebkitTextFillColor: '#000 !important',
                    },
                },
            },
        },
    },
});

const Login = () => {
    const navigate = useNavigate()
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loaded = useRef(false);

    const loginHandler = async (e) => {
        e.preventDefault()
        console.log("email", email);
        console.log("password", password);
       
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user",user);
                if(user){
                    toast.success(`Login successful!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }

                setTimeout(()=>{
                    navigate("/order")
                },1000)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("code",errorCode);
                console.log(errorMessage);
                toast.error(errorMessage.slice(errorMessage.indexOf("(") + 1,errorMessage.lastIndexOf(")")), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                // ..
            });

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

            <Navbar />
            <Container>
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className='gridContainer'>
                            <div className="inputContainer">
                                <h2 style={{ textAlign: "center" }}>CHECKOUT</h2>
                                <ThemeProvider theme={theme}>
                                    <Autocomplete
                                        key={1}
                                        className="google-map-demo custom-autocomplete"
                                        style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.description
                                        }
                                        options={options}
                                        autoComplete
                                        includeInputInList
                                        filterSelectedOptions
                                        value={email}
                                        freeSolo
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setEmail(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Email" style={{ borderRadius: "5px" }} className='custom-textfield' InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>

                                                    </React.Fragment>
                                                ),
                                            }}
                                                InputLabelProps={{
                                                    style: { color: "black" }
                                                }}
                                            />

                                        )}
                                    />
                                </ThemeProvider>
                                <ThemeProvider theme={theme}>
                                    <Autocomplete
                                        key={2}
                                        className="google-map-demo custom-autocomplete"
                                        style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.description
                                        }
                                        options={options}
                                        autoComplete
                                        includeInputInList
                                        filterSelectedOptions
                                        value={password}
                                        freeSolo
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue2(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setPassword(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Phone" style={{ borderRadius: "5px" }} className='custom-textfield' InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>

                                                    </React.Fragment>
                                                ),
                                            }}
                                                InputLabelProps={{
                                                    style: { color: "black" }
                                                }}
                                            />

                                        )}
                                    />
                                </ThemeProvider>
                               
                                
                                <Button className='placeOrderBtn' onClick={loginHandler} >Place order</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Login