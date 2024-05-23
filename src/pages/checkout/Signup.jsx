import { Box, Container,Grid } from '@mui/material'
import React, { useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./signup.css"
import Navbar from '../../components/navbar/hello/Navbar';


const Signup = () => {
    const [options, setOptions] = useState([]);
    const [value, setValue] =useState(null);
    const [value2, setValue2] =useState(null);
    const [value3, setValue3] =useState(null);
    const [value4, setValue4] =useState(null);

    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');

    const loaded = useRef(false);
    
    return (
        <>
        <Navbar/>
        <Container>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className='gridContainer'>
                        <div className="inputContainer">
                        <Autocomplete
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
                                <TextField {...params} label="Full name" style={{ borderRadius:"5px" }} className='custom-textfield' InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            
                                        </React.Fragment>
                                    ),
                                }}
                                    InputLabelProps={{
                                        style: { color:"#6851ff" }
                                    }}                                  
                                />
                                
                            )}
                        />
                        <Autocomplete
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
                                <TextField {...params} label="Phone" style={{  borderRadius:"5px" }} className='custom-textfield' InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            
                                        </React.Fragment>
                                    ),
                                }}
                                    InputLabelProps={{
                                        style: { color:"#6851ff" }
                                    }}                                  
                                />
                                
                            )}
                        />
                         <Autocomplete
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
                                <TextField {...params} label="Email" style={{  borderRadius:"5px" }} className='custom-textfield' InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            
                                        </React.Fragment>
                                    ),
                                }}
                                    InputLabelProps={{
                                        style: { color:"#6851ff" }
                                    }}                                  
                                />
                                
                            )}
                        />
                         <Autocomplete
                            className="google-map-demo custom-autocomplete"
                            style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}
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
                                <TextField {...params} label="Address" style={{  borderRadius:"5px" }} className='custom-textfield' InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            
                                        </React.Fragment>
                                    ),
                                }}
                                    InputLabelProps={{
                                        style: { color:"#6851ff" }
                                    }}                                  
                                />
                                
                            )}
                        />

                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </>
    )
}

export default Signup