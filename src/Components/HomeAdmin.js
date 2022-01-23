import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom'
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, collection, getDocs } from "firebase/storage"; 
import TextField from '@mui/material/TextField';
import { app, storage, db, database } from '../firebase-config';
import { ref, child, get, push, update } from "firebase/database";
export default function HomeAdmin() {
    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setFileName] = useState('');
	const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
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
            {/* <button onClick={handleSubmission(selectedFile,fileName)}> Upload File</button> */}
        </div>
        </div>
    )
}