import { useState,useEffect   } from 'react';
import './App.css';
import LoginForm from './Components/Common/LoginForm';
import RegisterForm from './Components/Common/RegisterForm';
import HomeDoctor from './Components/HomeDoctor';
import HomePatient from './Components/HomePatient';
import HomeAdmin from './Components/HomeAdmin';
import Home from './Components/Home';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { app, storage, database } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, child, get, push, update } from "firebase/database";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] =  useState('');
  const [name, setName] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          let dbRef = ref(database);
          get(child(dbRef, `users`)).then((snapshot) => {
            let snapshot_val = snapshot.val();
            let uid_val = response.user.uid;
            let role_val = snapshot_val[uid_val]['role']['role'];
            console.log(role_val)
            if(role_val=='Doctor'){
              navigate('/homedoctor')
            }
            else if(role_val=='Patient'){
              navigate('/homepatient')
            }
            else if(role_val=='Admin'){
              navigate('/homeadmin')
            }
          }).catch((error) => {
          console.error(error);
          });
          // console.log(response)
          // sessionStorage.setItem('UID', response.user.uid)
          
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
        
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          const postData = {
            name: {name},
            role: {role},
            email: {email}
          };
          const dbRef = ref(database);
          const updates = {};
          updates['/users/' + response.user.uid] = postData;

          update(dbRef, updates);
          if(role=='Doctor'){
            navigate('/homedoctor')
          }
          else if(role=='Patient'){
            navigate('/homepatient')
          }
          else if(role=='Admin'){
            navigate('/homeadmin')
          }
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
  //   let uid = sessionStorage.getItem('UID')
  //   console.log(uid)
  //   getAuth()
  //     .getUser(uid)
  //       .then((userRecord) => {
  //   // The claims can be accessed on the user record.
  //       console.log(userRecord);
  // });
    if (authToken) {
      if(role=='Doctor'){
        navigate('/homedoctor')
      }
      else if(role=='Patient'){
        navigate('/homepatient')
      }
      else if(role=='Admin'){
        navigate('/homeadmin')
      }
      
    }
  }, [])

  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path='/login'
            element={
              <LoginForm
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />}
          />
          <Route
            path='/register'
            element={
              <RegisterForm
                title="Registration"
                setEmail={setEmail}
                setPassword={setPassword}
                setRole = {setRole}
                setName = {setName}
                handleAction={() => handleAction(2)}
              />}
          />

          <Route
            path='/homedoctor'
            element={
              <HomeDoctor />}
          />

          <Route
            path='/homepatient'
            element={
              <HomePatient />}
          />

          <Route
            path='/homeadmin'
            element={
              <HomeAdmin />}
          />

          <Route
            path='/'
            element={
              <Home />}
          />
        </Routes>
      </>
      <ToastContainer />
    </div>
  );
}

export default App;