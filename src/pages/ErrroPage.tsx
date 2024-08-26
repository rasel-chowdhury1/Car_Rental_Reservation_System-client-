
import img from '../assets/404.gif'
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const ErrrorPage = () => {
    return (
        <div className='w-3/5 m-auto'>
            <div >
                <img src={img} alt="" />
            </div>
            <div className='grid justify-items-center'>
            <Link to='/' className="btn btn-active bg-orange-600 text-white">Back to Home <IoHomeOutline /></Link>
            </div>
            
        </div>
    );
};

export default ErrrorPage;