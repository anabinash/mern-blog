import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {app} from'../firebase'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

  const auth=getAuth(app);
   const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleGoogleClick = async () => {
     const provider=new GoogleAuthProvider();
     provider.setCustomParameters({prompt:'select_account'})
     try{
         const resultFromGoogle=await  signInWithPopup(auth,provider)
         console.log(resultFromGoogle)
         const resp=await axios.post('http://localhost:3000/api/auth/google',{name:resultFromGoogle.user.displayName,
        email:resultFromGoogle.user.email,
        googlePhotoUrl:resultFromGoogle.user.photoURL
        })
         const data=await resp.data;
           if(resp.status==200){
              dispatch(signInSuccess(data));
               navigate('/');
           }
     }
     catch(error){
        console.log(error);
     }

  };

  return (
    <Button type="button" gradientDuoTone="pinkToOrange" onClick={handleGoogleClick} outline>
      <AiFillGoogleCircle className="w-5 h-5 mr-2" />
      Continue with Google
    </Button>
  );
}
