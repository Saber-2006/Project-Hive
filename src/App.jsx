import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects';
import Analysis from './pages/Analysis';
import Board from './pages/Board';
import ProjectDetails from './pages/ProjectDetails';
import Notfound from './pages/Notfound';
import AuthLayout from './layout/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import MainLayout from './layout/MainLayout';

const router = createBrowserRouter([
  {path: '', element: <MainLayout/>, children:
    [
      {index:true,element:<Projects/>},
      {path:'analysis',element:<Analysis/>},
      {path:'board',element:<Board/>},
      {path:'projectdetails/:id', element:<ProjectDetails/>},
      {path:'*',element:<Notfound/>}
    ]
  },
  {path:'auth', element: <AuthLayout/>, children:[
    {index:true, element: <SignIn/>},
    {path:'signup', element: <SignUp/>},
    {path:'*', element: <Notfound/>}
  ]}
]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App