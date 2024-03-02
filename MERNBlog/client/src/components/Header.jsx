import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toogleThems } from '../redux/theme/themeSlice'
export default function Header() {

    const path=useLocation().pathname;
    const {currentUser}= useSelector((state) => state.user);
    const {theme}=useSelector((state)=>state.theme);
    // const currentUser = userState ? userState.currentUser : null;
    // const userState = useSelector(state => state.user);
    // const currentUser = userState && userState.currentUser ? userState.currentUser : null;
    const dispatch=useDispatch();
      
  return (
   <Navbar className='border-b-2'>
   <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
     <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-lg text-white'>Sterios's</span>
     Blog
   </Link>
   <form>
    <TextInput type='text' placeholder='Search...' 
    rightIcon={AiOutlineSearch} className='hidden lg:inline'/>
   </form>
   <Button className='w-12 h-10 lg:hidden' color='gray' pill>
    <AiOutlineSearch/>
   </Button>
   <div className='flex gap-2  md:order-2'>
    <Button className='w-12 h-10  lg:inline' color='gray' pill onClick={()=>dispatch(toogleThems())}>
       {theme==='light'?<FaMoon/>:<FaSun/>}
    </Button>
{currentUser ? (
       <Dropdown   arrowIcon={false}
       inline
       label={
         <Avatar alt='user' img={currentUser.ProfilePicture} rounded/>}>
          <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span  className='block text-sm font-medium truncate'>@{currentUser.email}</span>
        </Dropdown.Header> 
        <Link to={'/dashboard?tab=profile'}> 
        <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        <Dropdown.Divider/>
            <Dropdown.Item>
                Sign out
            </Dropdown.Item>
       </Dropdown>
):(
    <Link to='/sign-in'>
    <Button gradientDuoTone='purpleToBlue' outline pill>
        Sign In
    </Button>
   </Link>
)}

    <Navbar.Toggle/>
   </div>
    <Navbar.Collapse>
        <Navbar.Link  active={path==="/"} as={'div'}>
            <Link to="/">
                Home
            </Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/about"} as={'div'}>
            <Link to="/about">
             About
            </Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/project"} as={'div'}>
            <Link to="/projects">
                Projects
            </Link>
        </Navbar.Link>
    </Navbar.Collapse>
   </Navbar>

  )
}
