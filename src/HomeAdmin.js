import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import DateAdapter from '@mui/lab/AdapterDateFns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { app, storage, database } from '../firebase-config';
import { ref, child, get, push, update } from "firebase/database";
import { getStorage, uploadBytes, ref as sref, getDownloadURL } from "firebase/storage";
import { SettingsApplicationsTwoTone } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';

import MaterialTable from 'material-table'
import { Link } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox';
//import 'react-toastify/dist/ReactToastify.css';



const drawerWidth = 220;



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

export default function HomeAdmin() {
    const [value, setValue] = React.useState(3);

    const handleChanges = (event, newValue) => {
        setValue(newValue);
    };
    const empList = [
        { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', location: 'Chennai' },
        { id: 2, name: "Raj", email: 'raj@gmail.com', location: 'Kolkata' },
        { id: 3, name: "David", email: 'david342@gmail.com', location: 'Delhi' },
        { id: 4, name: "Vikas", email: 'vikas75@gmail.com', location: 'Mumbai' },
      ]
      
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
      const columns = [
        { title: "Name", field: "name"},
        { title: "Email", field: "email" },
        { title: "Location", field: 'location' },
        {title:"Profile",render:rowData=><Link href={`about:blank`} target="_blank">Profile</Link>},
        {title:"Status",render:rowData=><Checkbox {...label}/>}
        ]   

    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setFileName] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
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

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/homeadmin')
        }

        if (!authToken) {
            navigate('/register')
        }
        let dbRef = ref(database);
        get(child(dbRef, `users`)).then((snapshot) => {
            let snapshot_val = snapshot.val();
            let uid = sessionStorage.getItem('UID')
            if ('name' in snapshot_val[uid]) {
                let name = snapshot_val[uid]['name'];
                setFirstName(name.split(" ")[0]);
                setLastName(name.split(" ")[1]);
            }
            if ('gender' in snapshot_val[uid]) {
                setGender(snapshot_val[uid]['gender']);
            }
            if ('mob' in snapshot_val[uid]) {
                setMob(snapshot_val[uid]['mob']);
            }
            if ('bloodgroup' in snapshot_val[uid]) {
                setBloodGroup(snapshot_val[uid]['bloodgroup']);
            }
            if ('dob' in snapshot_val[uid]) {
                setDate(snapshot_val[uid]['dob']);
            }
            if ('address1' in snapshot_val[uid]) {
                setAddress1(snapshot_val[uid]['address1']);
            }
            if ('address2' in snapshot_val[uid]) {
                setAddress2(snapshot_val[uid]['address2']);
            }
            if ('city' in snapshot_val[uid]) {
                setCity(snapshot_val[uid]['city']);
            }
            if ('state' in snapshot_val[uid]) {
                setState(snapshot_val[uid]['state']);
            }
            if ('country' in snapshot_val[uid]) {
                setCountry(snapshot_val[uid]['country']);
            }
        });
    }, [])
    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>

            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <RemoveRedEyeIcon
                        sx={{ border: 3, width: 40, height: 30, borderRadius: 2 }}
                    />
                    <Typography variant="h5" component="div">
                        -
                    </Typography>
                    <RemoveRedEyeIcon
                        sx={{ border: 3, width: 40, height: 30, borderRadius: 2 }}
                    />

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ mx: 2, flexGrow: 1 }}
                    >
                        Tele-Opthalmology
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={handleLogout}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        border: 1,
                        boxShadow: 10
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        alignSelf: "center",
                        m: 2,
                        bgcolor: "Background"
                    }}
                />
                <Typography sx={{ alignSelf: "center", mb: 2 }}>ADMIN</Typography>
                <Divider />
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChanges}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                >
                    <Tab
                        icon={<PersonIcon />}
                        iconPosition="start"
                        label="Profile"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<ManageAccountsIcon />}
                        iconPosition="start"
                        label="Manage Account"
                        {...a11yProps(1)}
                    />
                    {/* <Tab
                        icon={<SettingsIcon />}
                        iconPosition="start"
                        label="Settings"
                        {...a11yProps(2)}
                    /> */}

                    <Divider />

                    <Tab
                        icon={<DashboardIcon />}
                        iconPosition="start"
                        label="Dashboard"
                        {...a11yProps(2)}
                    />
                    <Tab
                        icon={<AddCircleIcon sx={{ color: "red" }} />}
                        iconPosition="start"
                        label="Doctors"
                        {...a11yProps(3)}
                    />
                    <Tab
                        icon={<SupervisorAccountIcon />}
                        iconPosition="start"
                        label="Patients"
                        {...a11yProps(4)}
                    />
                </Tabs>
            </Drawer>

            <Box component="div" >
                <Toolbar />
                <TabPanel value={value} index={0}>
                    <CssBaseline />
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
                        <Button
                            type="button"
                            variant="contained"

                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Profile picture
                        </Button>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CssBaseline />
                    <Box justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap', ml: 50, mt: 10 }}>
                        <div>
                            <Typography variant="h5" align='center'>Change Password</Typography>
                            <br />
                            <Grid item xs={4}>
                                <TextField required id="email" label="Enter your Email ID" variant="outlined" sx={{ m: 2, minWidth: "50ch" }} />
                            </Grid>
                            <FormControl sx={{ m: 2, width: '50ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Type New Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Type New Password"
                                />
                            </FormControl>
                            <br />
                            <FormControl sx={{ m: 2, width: '50ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm New Password"
                                />
                            </FormControl>
                            <br />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Password
                            </Button>
                        </div>
                    </Box>
                </TabPanel>
                {/* {/* <TabPanel value={value} index={2}>
                <CssBaseline />
                    Item Three 
                </TabPanel> */}
                <TabPanel value={value} index={3}>
                    <CssBaseline />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card sx={{ minHeight: 200, minWidth: 200, bgcolor: '#009688', m: 2, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h4" component="div" color='#FFF'>
                                        Total No. Of Doctors Online:
                                    </Typography>
                                    <br />
                                    <Typography variant="h3" color='#FFF'>
                                        28/50
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card sx={{ minHeight: 200, minWidth: 200, bgcolor: '#ffc107', m: 2, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h4" component="div" color='#FFF'>
                                        Total No. Of Patients Visited:
                                    </Typography>
                                    <br />
                                    <Typography variant="h3" color='#FFF'>
                                        50
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card sx={{ minHeight: 200, minWidth: 200, bgcolor: '#e53935', m: 2, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h4" component="div" color='#FFF'>
                                        Pending Verification Of Doctors:
                                    </Typography>
                                    <br />
                                    <Typography variant="h3" color='#FFF'>
                                        5
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card sx={{ minHeight: 200, minWidth: 200, bgcolor: 'primary.main', m: 2, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h4" component="div" color='#FFF'>
                                        Pending Appointments:
                                    </Typography>
                                    <br />
                                    <Typography variant="h3" color='#FFF'>
                                        12
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <CssBaseline />
                    <Box>
                        <Typography variant="h5" sx={{ ml: 2 }} gutterBottom>
                            Pending Verifications
                        </Typography>
                        <div style={{ height: 400, width: '100%' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>

                                    <MaterialTable
                                        title="Doctors Verification"
                                        data={empList}
                                        columns={columns}
                                    />

                                </div>
                            </div>
                        </div>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <CssBaseline />
                    Item Six
                </TabPanel>
            </Box>
        </Box >
    );
}
