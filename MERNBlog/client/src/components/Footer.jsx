import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import{BsFacebook,BsInstagram,BsTwitter,BsGithub,BsDribbble} from 'react-icons/bs'; 

export default function FooterComp() {

    
  return (
    <Footer  container className='border border-t-4 border-teal-500 mt-48'>
       <div className='w-full max-w-7xl mx-auto'>
     <div className='grid w-full justify-between sm:flex md:grid-cols-1 '>
      <div className='mt-6'>
         
         <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
     <span className='px-1 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-lg text-white'>Sterios's</span>
       Blog
       </Link> 
         </div>
         <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-7'>
            <div>
            <Footer.Title title='About'/>
            <Footer.LinkGroup col>
               <Footer.Link
               href='https://www.100jsprojects.com'
               target='_blank'
               rel='nooper noooreproe'
               >
                100 js Projects
               </Footer.Link>
               <Footer.Link
               href='/about'
               target='_blank'
               rel='nooper noooreproe'
               >
                Sterios blog
               </Footer.Link>

            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Follow us'/>
            <Footer.LinkGroup col>
               <Footer.Link
               href='https://www.github.com/anabinash'
               target='_blank'
               rel='nooper noooreproe'
               >
                Github
               </Footer.Link>
               <Footer.Link
               href='#'
               target='_blank'
               rel='nooper noooreproe'
               >
                 Discord
               </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Follow us'/>
            <Footer.LinkGroup col>
               <Footer.Link
               href='#'
               target='_blank'
               rel='nooper noooreproe'
               >
                privacy Policy
               </Footer.Link>
               <Footer.Link
               href='#'
               target='_blank'
               rel='nooper noooreproe'
               >
                 Terms &amp; Conditions
               </Footer.Link>
            </Footer.LinkGroup>
            </div>
         </div>
      </div>
      <Footer.Divider/>
      <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <Footer.Copyright  href='#' by="Sterio's Blogs" year={new Date().getFullYear()}/></div>
      <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center' >
          <Footer.Icon href='#' icon={BsFacebook}/>
          <Footer.Icon href='#' icon={BsInstagram}/>
          <Footer.Icon href='#' icon={BsTwitter}/>
          <Footer.Icon href='https://github.com/anabinash' icon={BsGithub}/>
          <Footer.Icon href='#' icon={BsDribbble}/>

      </div>
     </div>
    </Footer>
   
  )
}
