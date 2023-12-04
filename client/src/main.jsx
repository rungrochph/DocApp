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
import Vacation from './components/Vacation';
import Vacform from './components/Vacform';
import Vactable from './components/Vactable';
import Vacsearch from './components/Vacsearch';
import Statuscard from './components/Statuscard';
const router = createBrowserRouter([
  {path: "/",element: <Menu/>,}
  ,{path: "/navbar",element: <Navbar/>,}
  ,{path: "/login",element: <Login/>,}
  ,{path: "/Register",element: <Register/>,}
  ,{path: "/Vacation",element: <Vacation/>,}
  ,{path: "/Vacform",element: <Vacform/>,}
  ,{path: "/Vactable",element: <Vactable/>,}
  ,{path: "/Vacsearch",element: <Vacsearch/>,}
  ,{path: "/statuscard",element: <Statuscard/>,}
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);