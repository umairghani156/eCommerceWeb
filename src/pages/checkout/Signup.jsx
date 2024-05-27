import { Box, Container, Grid } from '@mui/material'
import { ToastContainer, toast } from "react-toastify";

import React, { useEffect, useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./signup.css"
import Navbar from '../../components/navbar/hello/Navbar';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword ,auth, onAuthStateChanged} from '../../config/firebase';
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

const Signup = () => {
    const navigate = useNavigate()
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);

    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');

    const loaded = useRef(false);

    const signupHandler = async (e) => {
        e.preventDefault()
        console.log("fullname",typeof inputValue);
        console.log("phone", inputValue2);
        console.log("email", inputValue3);
        console.log("address", inputValue4);
        if(!inputValue || !inputValue2 || !inputValue3 || !inputValue4){
          return   toast.error("All fields are required!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
        await createUserWithEmailAndPassword(auth, inputValue3, inputValue2)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user",user);
                if(user){
                    toast.success(`SignUp successful!`, {
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
               
               
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("code",errorCode);
                console.log(errorMessage);
                // ..
            });
            setTimeout(()=>{
                navigate("/order")
            },1000)
        }

    }
    useEffect(()=>{
     const signUpCheckUser = ()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              navigate("/login")
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
     };
     signUpCheckUser()
    },[])
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
                                        value={value}
                                        freeSolo
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Full name" style={{ borderRadius: "5px" }} className='custom-textfield' InputProps={{
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
                                        value={value2}
                                        freeSolo
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue2(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue2(newInputValue);
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
                                <ThemeProvider theme={theme}>
                                    <Autocomplete
                                        key={3}
                                        className="google-map-demo custom-autocomplete"
                                        style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.description
                                        }
                                        options={options}
                                        autoComplete
                                        includeInputInList
                                        filterSelectedOptions
                                        value={value2}
                                        freeSolo
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue3(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue3(newInputValue);
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
                                        key={4}
                                        className="google-map-demo custom-autocomplete"
                                        style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.description
                                        }
                                        options={options}
                                        autoComplete
                                        includeInputInList
                                        filterSelectedOptions
                                        value={value3}
                                        freeSolo
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue4(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue4(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Address" style={{ borderRadius: "5px", backgroundColor: "transparent" }} className='custom-textfield' InputProps={{
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
                                <Button className='placeOrderBtn' onClick={signupHandler} >Place order</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Signup