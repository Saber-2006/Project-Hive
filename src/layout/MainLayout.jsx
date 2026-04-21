import React from 'react'
import Navebar from '../components/layout/Navebar';
import { Outlet, useLocation } from 'react-router-dom';



export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navebar activePath={location.pathname} />
      <main className="mt-10 pt-10 mx-3  ">
        <Outlet />
      </main>
    </div>
  )
}
