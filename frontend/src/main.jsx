import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import routes from './routes/routes.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={"loading"}> 
    <RouterProvider router={router} />
    </Suspense>  
  </React.StrictMode>
);