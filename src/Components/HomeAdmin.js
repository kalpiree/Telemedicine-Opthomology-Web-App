import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom'
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, collection, getDocs } from "firebase/storage"; 
import TextField from '@mui/material/TextField';
import { app, storage, db, database } from '../firebase-config';
import { ref, child, get, push, update } from "firebase/database";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
export default function HomeAdmin() {
    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setFileName] = useState('');
	const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    // const dbRef = ref(database);
    // get(child(dbRef, `users`)).then((snapshot) => {
    // if (snapshot.exists()) {
    //     console.log(snapshot.val());
    // } else {
    //     console.log("No data available");
    // }
    // }).catch((error) => {
    // console.error(error);
    // });


	// const handleSubmission = (file,fileName) => {
    //     const storage = getStorage();
    //     const storageRef = ref(storage, 'images/' + fileName);
    //     uploadBytes(storageRef, file).then((snapshot) => {
    //         console.log('Uploaded a blob or file!');
    //       });
	// };
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
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
    }, [])
    return (
        <div>
            Home Page
        {/* <div>
            <input type="file" name="file" onChange={changeHandler} />
            <TextField
                    id="filename"
                    label="Enter the filename"
                    variant="outlined"
                    onChange={(e) => setFileName(e.target.value)}
                />
        </div> */}
        <div>    
            <button onClick={handleLogout}>Log out</button>
        </div>

        <div>
            <Button variant="contained" color="success">
        Success

        </Button>
        </div>

      
        <div>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
        </div>
        <div>
        <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp />
      </Stack>
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />
    </Box>
    <div>
    <Button variant="contained">Contained</Button>
    </div>
        </div>

        </div>
        
    )
}