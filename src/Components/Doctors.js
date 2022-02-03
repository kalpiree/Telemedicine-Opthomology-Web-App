import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from './listItems';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { endOfYesterday, startOfWeek, startOfMonth, subMonths } from 'date-fns';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import blood_test from '../images/blood-test.png'
import eye from '../images/left_eye.png'
import health_report from '../images/health-report.png';
import { keyframes } from '@mui/system';
import theme from './theme';
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
    useGetList,
} from 'react-admin';

const itemData = [
    {
      img: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg',
      title: 'John Doe',
      author: 'MD MS',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
        img: 'https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg',
        title: 'John Doe',
        author: 'MD MS',
        rows: 2,
        cols: 2,
        featured: true,
      },
      {
        img: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg',
        title: 'John Doe',
        author: 'MD MS',
        rows: 2,
        cols: 2,
        featured: true,
      },
      {
        img: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg',
        title: 'John Doe',
        author: 'MD MS',
        rows: 2,
        cols: 2,
        featured: true,
      },
      {
        img: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg',
        title: 'John Doe',
        author: 'MD MS',
        rows: 2,
        cols: 2,
        featured: true,
      },
    
  ];

// const getColorFromStatus = (status) =>
//     status === 'cold'
//         ? '#7dbde8'
//         : status === 'warm'
//         ? '#e8cb7d'
//         : status === 'hot'
//         ? '#e88b7d'
//         : status === 'in-contract'
//         ? '#a4e87d'
//         : '#000';
//  const Status = ({ status }) => (
//     <Box
//         width={10}
//         height={10}
//         display="inline-block"
//         borderRadius={5}
//         bgcolor={getColorFromStatus(status)}
//         component="span"
//     />
// );
const drawerWidth = 240;
const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Tech-Medicine.
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();
export default function Doctors() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
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
            navigate('/doctors')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Tele-Medicine
            </Typography>
            <Avatar>N</Avatar>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            backgroundImage: `url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg)`,
            flexGrow: 1,
            height: '100%',
            overflow: 'hidden',
          }}
        >
            <ImageList sx={{ width: '100%', height: '100%',overflow: 'auto' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <Button
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`book ${item.author}`}
                variant="contained"
              >
                Book Appointment
              </Button>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
          <Toolbar />
          <Copyright sx={{ pt: 4 }} />
        </Box>
        </Box>
        </ThemeProvider>
    )
}