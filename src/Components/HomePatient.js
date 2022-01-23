import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import blood_test from '../images/blood-test.png'
import eye from '../images/left_eye.png'
import health_report from '../images/health-report.png'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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
value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
};
}

function Item(props) {
const { sx, ...other } = props;
return (
    <Box
    sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
    }}
    {...other}
    />
);
}
  
Item.propTypes = {
sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
]),
};
  
export default function HomePatient() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const pages = ['Features', 'About Us', 'Contact'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
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
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            navigate('/homepatient')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
        <div>
                        <AppBar position="static">
                            <Container maxWidth="xl">
                                <Toolbar disableGutters>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                >
                                    LOGO
                                </Typography>

                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                    >
                                    <MenuIcon />
                                    </IconButton>
                                    <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                    >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                    </Menu>
                                </Box>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                >
                                    LOGO
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                    ))}
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                    </Tooltip>
                                    <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                    </Menu>
                                </Box>
                                </Toolbar>
                            </Container>
                </AppBar>
                <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <AppBar position="static">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="Medical Information" {...a11yProps(0)} />
                    <Tab label="Doctors" {...a11yProps(1)} />
                    <Tab label="Appointments" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box
                        sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                    >
                        <Item>Name</Item>
                        <Item>Nitin Bisht</Item>
                        <Item>Date of Birth</Item>
                        <Item>03-04-2000</Item>
                        <Item>Gender</Item>
                        <Item>Male</Item>
                        <Item>Blood Group</Item>
                        <Item>B+</Item>
                    </Box>
                    <Divider>
                        <Chip label="Available Documents" />
                    </Divider>
                    <Box
                        sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        }}
                    >
                       <Card sx={{ maxWidth: 345 }}>
                           <div>
                               <CardMedia
                                component="img"
                                alt="blood report"
                                height="5%"
                                image={blood_test}
                            />
                           </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Blood Report
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Date uploaded: 12/01/2002
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Upload</Button>
                                <Button size="small">Download</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ maxWidth: 345 }}>
                        <div>
                            <CardMedia
                                component="img"
                                alt="left eye"
                                height="5%"
                                image={eye}
                            />
                            </div>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Left Eye Image
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Date uploaded: 12/01/2002
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Upload</Button>
                                <Button size="small">Download</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ maxWidth: 345 }}>
                            <div>
                            <CardMedia
                                component="img"
                                alt="right eye"
                                height="5%"
                                image={eye}
                            />
                            </div>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Right Eye Image
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Date uploaded: 12/01/2002
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Upload</Button>
                                <Button size="small">Download</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ maxWidth: 345 }}>
                            <div>
                            <CardMedia
                                component="img"
                                alt="full health report"
                                height="5%"
                                image={health_report}
                            />
                            </div>
                            
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Full Health Report
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Date uploaded: 12/01/2002
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Upload</Button>
                                <Button size="small">Download</Button>
                            </CardActions>
                        </Card> 
                    </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    Doctors
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                    Appointments
                    </TabPanel>
                </SwipeableViews>
                </Box>
                
        </div>
    )
}