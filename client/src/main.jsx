import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//impoort Component
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login  from './components/Login';
import Menu from './components/Menu';

const router = createBrowserRouter([
  {path: "/",element: <Menu/>,}
  ,{path: "/navbar",element: <Navbar/>,}
  ,{path: "/login",element: <Login/>,}
  ,{path: "/Register",element: <Register/>,}
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);