import React from 'react'
import { Routes, Route } from "react-router-dom";
import Contact from '../Pages/Contact';
import Chart from '../Pages/Chart';


const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Contact />} />
            <Route path='/chart' element={<Chart />} />
        </Routes>
    )
}

export default AllRoutes