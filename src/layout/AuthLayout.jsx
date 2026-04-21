import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { MdCreateNewFolder, MdOutlineEditNote, MdOutlineMoveUp } from 'react-icons/md';
import { FaArrowRight, FaMagnifyingGlassChart } from 'react-icons/fa6';
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <div className='bg-gray-200/50'>
    <div className='auth-layout lg:flex lg:flex-row gap-10'>
  <div className="relative w-full lg:w-1/2  h-screen bg-cover bg-center bg-[url('/imag/18184.jpg')]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/85 to-teal-500/85"></div>
      {/* Content on top */}
      <div className="relative z-10 m-5 p-3 h-full gap-4 flex flex-col ">
        <div className='flex row gap-4  items-center'>
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30">
            <span className="text-white font-bold text-[20px]">PH</span>
          </div>
          <p className="text-white font-bold text-[20px]">Project Hive</p>
        </div>
        <h1 className='text-white  text-bold text-[50px] '>Welcome to <span className="bg-gradient-to-t from-green-500 to-white/50 bg-clip-text text-transparent">Project Hive</span> </h1> 
          <p className="text-white text-xlg md:text-[18px] max-w-md">
            Organize your projects, boost your productivity, and stay focused — all in one place.
          </p>
          

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full  max-h-2000px] overflow-y-auto gap-6'>
<Card 
  className="w-full bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg transition transform hover:scale-101 hover:shadow-2xl hover:bg-white/30"
  variant='tertiary'
>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-white mb-2">
      <div className='flex row gap-3 items-center '>
        <div className='rounded-lg items-center bg-green-400 p-2'>
          <MdCreateNewFolder />
        </div>
        Create & Manage Projects
      </div>
      
      </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-white/90 text-md mt-2">Start new projects, organize tasks, and keep everything under control.</p>
  </CardContent>
</Card>
  <Card 
  className="w-full bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg transition transform hover:scale-102 hover:shadow-2xl hover:bg-white/30"
  variant='tertiary'
>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-white mb-2">
      <div className='flex row gap-3 items-center '>
        <div className='rounded-lg items-center bg-sky-500 p-2'>
          <MdOutlineEditNote />
        </div>
        Add, Edit & Track Tasks
      </div>
    </CardTitle>
    <p className="text-white/90 text-md mt-2">
      Quickly add tasks, update progress, and never miss a deadline
    </p>
  </CardHeader>
</Card>
  <Card  
  className=" w-full bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg transition transform hover:scale-102 hover:shadow-2xl hover:bg-white/30"
  variant='tertiary'
>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-white mb-2">
      <div className='flex row gap-3 items-center '>
        <div className='rounded-lg items-center bg-purple-500 p-2'>
          <MdOutlineMoveUp />
        </div>
        Drag & Drop Task Board
      </div>
    </CardTitle>
    <p className="text-white/90 text-md mt-2">
    Move tasks around easily for a clear visual workflow.
    </p>
  </CardHeader>
</Card>
  <Card 
  className="w-full bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg transition transform hover:scale-102 hover:shadow-2xl hover:bg-white/30"
  variant='tertiary'
>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-white mb-2">
      <div className='flex row gap-3 items-center'>
        <div className='rounded-lg items-center bg-yellow-400 p-2'>
          <FaMagnifyingGlassChart />
        </div>
        Analyze Project Performance
      </div>
      
      </CardTitle>
    <p className="text-white/90 text-md mt-2">
    Get insights and track progress to optimize your workflow.
    </p>
  </CardHeader>
</Card>
          </div>
          <p className="text-white/90 mt-2 text-lg flex row gap-2 items-center  m-auto mt-10">
  Start your first project today — it only takes a minute! 
<span
  className="inline-block p-1 rounded-lg bg-green-500"
  style={{
    animation: 'moveRight 1.5s ease-in-out infinite alternate',
  }}
>
  <FaArrowRight />
</span>
</p>


        
      </div> 
    </div >
      <div className='mx-auto my-auto '>
        <Outlet />
      </div>
      </div>
    </div>
  )
}

