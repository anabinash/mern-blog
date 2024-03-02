import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/signIn"
import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/signUp"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import FooterComp from "./components/Footer"
import PrivateRouter from "./components/PrivateRouter"
function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>

      <Route element={<PrivateRouter/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
      
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/projects" element={<Projects/>}/>
    </Routes>
       <FooterComp/>
    </BrowserRouter>  
    </>
  )
}

export default App
