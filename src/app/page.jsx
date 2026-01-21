"use client"
import Navbar from '@/app/_component/Navbar'
import useAuthStore from '../../store/authStore'

import React from 'react'
import Home from './_component/Home'
import { Footer } from './_component/Footer'

const page = () => {
  const { isLoggedIn, sAuthenticated } = useAuthStore();
  // console.log(isLoggedIn());
  // if(!isLoggedIn()){
  //   redirect('/signup')
  // }
  return (
    <div className="min-h-screen bg-[#0f0d1d]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default page