import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <div className='flex flex-row justify-between items-center text-white bg-[#f75990] px-4 py-2'>
            <Link to={"/"}>
                <div className='text-3xl font-serif'>TAIYO.AI</div>
            </Link>
            <div className='flex flex-row gap-3'>
                <Link to="/" style={{ color: location.pathname === '/' ? '#fff' : '#000' }} className='lg:p-5'>Contact</Link>
                <Link to="/chart" style={{ color: location.pathname === '/chart' ? '#fff' : '#000' }} className='lg:p-5'>Charts</Link>
            </div>
        </div>
    );
}

export default Header;
