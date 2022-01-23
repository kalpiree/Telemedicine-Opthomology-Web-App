import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom'
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, collection, getDocs, ref as sRef } from "firebase/storage"; 
import TextField from '@mui/material/TextField';
import { app, storage, db, database } from '../firebase-config';
export default function HomeDoctor() {
    const [selectedFile, setSelectedFile] = useState();
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


	const handleSubmission = (file,uid,it) => {
        const storage = getStorage();
        const storageRef = sRef(storage,uid+'_' +it);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
	};
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
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
        <div>
            Home Page
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
        </div> 
        <div>    
            <button onClick={handleLogout}>Log out</button>
            <button onClick={handleSubmission(selectedFile,'saws1','br')}> Upload File</button>
        </div>
        </div>
    )
}