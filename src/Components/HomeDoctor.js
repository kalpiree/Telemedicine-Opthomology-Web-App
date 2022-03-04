import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, collection, getDocs, ref as sref } from "firebase/storage";
import TextField from '@mui/material/TextField';
import { app, storage, db, database } from '../firebase-config';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CssBaseline from '@mui/material/CssBaseline';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';

import DateAdapter from '@mui/lab/AdapterDateFns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ref, child, get, push, update } from "firebase/database";
import { SettingsApplicationsTwoTone } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/material/styles';


const src = 'https://static.vecteezy.com/system/resources/thumbnails/000/606/951/small/campuraai-12.jpg';

export default function HomeDoctor() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [value, setValue] = React.useState('3');
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);


    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [selected, setSelected] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [bloodGroup, setBloodGroup] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [middlename, setMiddleName] = React.useState('');
    const [mob, setMob] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [imgsrc, setImgSrc] = React.useState('https://i.imgur.com/Rbp9NSp.jpg');
    const [selectedProfilePic, setSelectedProfilePic] = useState();
    const [isProfilePicPicked, setIsProfilePicPicked] = useState(false);
    const changeProfilePic = (event) => {
        console.log("Entered profilepic")
        setSelectedProfilePic(event.target.files[0]);
        setIsProfilePicPicked(true);
    };
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleChangeMiddleName = (event) => {
        setMiddleName(event.target.value);
    };
    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleChangeMob = (event) => {
        setMob(event.target.value);
    };
    const handleChangeAddress1 = (event) => {
        setAddress1(event.target.value);
    };
    const handleChangeAddress2 = (event) => {
        setAddress2(event.target.value);
    };
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };
    const handleChangeState = (event) => {
        setState(event.target.value);
    };
    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };
    const handleChangeBloodGroup = (event) => {
        setBloodGroup(event.target.value);
    };

    const handleChangegender = (event) => {
        setGender(event.target.value);
    };
    const Input = styled('input')({
        display: 'none',
    });
    const handleSubmitData = (event) => {
        let dbRef = ref(database);
        get(child(dbRef, `users`)).then((snapshot) => {
            let snapshot_val = snapshot.val();
            let uid = sessionStorage.getItem('UID')
            const email = snapshot_val[uid]['email'];
            const role = snapshot_val[uid]['role'];
            const postData = {
                name: firstname + ' ' + lastname,
                role: role,
                email: email,
                gender: gender,
                mob: mob,
                bloodgroup: bloodGroup,
                dob: date,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                country: country
            };
            console.log(postData)
            const updates = {};
            updates['/users/' + uid] = postData;
            update(dbRef, updates);
        });
        toast.success('Your profile data is updated.', { autoClose: 2000 });
    }
    const handleProfilePic = (file) => {
        if (isProfilePicPicked) {
            console.log(file)
            let uid = sessionStorage.getItem('UID');
            const storageRef = sref(storage, uid + '/profile_pic');
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded profile pic!');
            });
            
        }
    };
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    const handleChanged = (event, newValue) => {
        setValue(newValue);
    };
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/homedoctor')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
        
        <Box>
        <CssBaseline />
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            <Avatar src={src} sx={{ width: 45, height: 45 }} />
                        </Typography>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            Tele-opthalmology
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                        >
                            <Avatar src={src} sx={{ width: 45, height: 45 }} />
                        </Typography>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                        >
                            Tele-opthalmology
                        </Typography>
                        <Button variant="outlined" color='inherit' sx={{ mx: 2 }} onClick={handleLogout}>Logout</Button>
                        <Avatar
                            src="/static/images/avatar/2.jpg"
                            sx={{ bgcolor: "#f44336" }}
                        />
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChanged} aria-label="lab API tabs example">
                            <Tab label="Consultation" value="1" />
                            <Tab label="Prescription" value="2" />
                            <Tab label="Profile" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <TextField required id="first_name" label="First Name" variant="outlined" autoWidth sx={{ m: '2', minWidth: '25ch' }} value={firstname} onChange={handleChangeFirstName} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="middle_name" label="Middle Name" variant="outlined" autoWidth sx={{ m: '2', minWidth: '25ch' }} value={middlename} onChange={handleChangeMiddleName} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="last_name" label="Last Name" variant="outlined" autoWidth sx={{ m: '2', minWidth: '25ch' }} value={lastname} onChange={handleChangeLastName} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required sx={{ m: 2, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    autoWidth
                                    value={gender}
                                    onChange={handleChangegender}
                                    label="Gender"
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Others'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required sx={{ m: 2, minWidth: 150 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Blood Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    autoWidth
                                    label="Blood Group"
                                    value={bloodGroup}
                                    onChange={handleChangeBloodGroup}
                                >
                                    <MenuItem value={'a-'}>A-</MenuItem>
                                    <MenuItem value={'a+'}>A+</MenuItem>
                                    <MenuItem value={'b-'}>B-</MenuItem>
                                    <MenuItem value={'b+'}>B+</MenuItem>
                                    <MenuItem value={'ab+'}>AB+</MenuItem>
                                    <MenuItem value={'ab-'}>AB-</MenuItem>
                                    <MenuItem value={'o+'}>O+</MenuItem>
                                    <MenuItem value={'o-'}>O-</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="mob" label="Mobile Number" variant="outlined" sx={{ m: 2, minWidth: 150 }} value={mob} onChange={handleChangeMob} />
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ m: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        renderInput={(props) => <TextField required {...props} />}
                                        label="Date of Birth"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        maxDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="address1" label="Address Line 1" variant="outlined" sx={{ m: 2 }} value={address1} onChange={handleChangeAddress1} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="address2" label="Address Line 2" variant="outlined" sx={{ m: 2 }} value={address2} onChange={handleChangeAddress2} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="city" label="City" variant="outlined" sx={{ m: 2 }} onChange={handleChangeCity} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="state" label="State" variant="outlined" sx={{ m: 2 }} value={state} onChange={handleChangeState} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="country" label="Country" variant="outlined" sx={{ m: 2 }} value={country} onChange={handleChangeCountry} />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmitData}
                    >
                        Update Profile Data
                    </Button>
                    <Grid>
                        <label htmlFor="profile-pic">
                            <Input accept="image/*" id="profile-pic" multiple type="file" onChange={changeProfilePic} />
                            <Button variant="contained" component="span" onClick={handleProfilePic(selectedProfilePic)}>
                                Upload Profile Picture
                            </Button>
                        </label>
                    </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}