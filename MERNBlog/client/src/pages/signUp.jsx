
import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formdata, setFormdata] = useState({username:"",password:"",email:""});
  const[errorMessage,setErrorMessage]=useState(null);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate()
const dispatch=useDispatch();
  const handleChange = (e) => {
     setFormdata({...formdata,[e.target.id]:e.target.value.trim()})
  };

 const sendRequest=async()=>{
  try {
     setLoading(true);
     setErrorMessage(null);
     const resp = await axios.post('http://localhost:3000/api/auth/signup', {
      username: formdata.username,
      password: formdata.password,
      email: formdata.email
    });
    const data = await resp.data;
    console.log(data);
    
    if(data.success===false){
       dispatch(signInFailure(data.message));
    }
    setLoading(false);
    // if (data.success === false) {
    //   setErrorMessage(data.message);
    // } else {
    //   setLoading(false);
    //   navigate('/sign-in');
    // }
    if(resp.status==200){
      dispatch(signInSuccess(data));
      navigate('/sign-in')
    }
  
  } catch (err) {
    setErrorMessage(err.message);
    setLoading(false);
  }
     
 }
const handleSubmit=async(e)=>{
 e.preventDefault();

if(!formdata.username || !formdata.password|| !formdata.email){
  setErrorMessage("please fill out all field !")
}
else{
  await sendRequest();
}
}
  return (
    <div className="min-h-scre mt-20">
      <div className="flex p-3 max-w-3xl  mx-auto flex-col md:flex-row gap-5">
        {/*left side*/}
        <div className="flex-1">
          <Link to="/" className="  font-bold dark:text-white text-2xl ">
            <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-lg text-white">
              Sterios's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sit
            perferendis consequuntur excepturi doloremque expedita praesentium
            cupiditate nesciunt deserunt, possimus error saepe nemo consequatur
            quod illo aliquid mollitia modi culpa.
          </p>
        </div>
        {/*right side */}
        <div className=" flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label id="Your name" />
              <TextInput
                type="text"
                placeholder="Username"
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label id="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label id="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
             {loading ? (
              <>
               <Spinner size='sm' />
               <span className="pl-3">Loading ....</span>
              </>):'Sign Up'
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            errorMessage && <Alert className="mt-5" color='failure'>
              {errorMessage}
            </Alert>
          }
        </div>
      </div>
    </div>
  );
}
