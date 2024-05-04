import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='w-full min-w-full bg-blue-600 h-full flex flex-row justify-evenly md:justify-end gap-4 p-4 text-3xl'>
            <Link to="/" className='lg:p-5'>Contact</Link>
            <Link to="/chart" className='lg:p-5'>Charts     </Link>
        </div>
    )
}

export default Header