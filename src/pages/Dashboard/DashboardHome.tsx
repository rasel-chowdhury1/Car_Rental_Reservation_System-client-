import { IoIosWallet } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import { IoStarOutline,IoHomeOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaPhone } from "react-icons/fa6";

const DashboardHome = () => {
    const user = undefined;
    return (
        <div className='m-8'>
            <h3 className='uppercase text-xl my-4'>Hi,Welcome Back!</h3>
           <div className='flex space-x-4 my-6' >
             <div className="basis-1/3 hover:basis-1/2 grid grid-cols-1 content-center   x-auto bg-[#BB34F5] h-[100px]">
                <h3 className='flex text-white text-2xl pl-4 md:pl-16'><IoIosWallet className='mr-2' /> Cart</h3>
             </div>
             <div className="basis-1/3 hover:basis-1/2 grid grid-cols-1 content-center bg-[#D3A256] h-[100px]">
                <h3 className='flex text-white text-2xl pl-4 md:pl-16'><IoHomeOutline className='mr-2' /> Shop</h3>
             </div>
             <div className="basis-1/3 hover:basis-1/2 grid grid-cols-1 content-center bg-[#FE4880] h-[100px]">
                <h3 className='flex text-white text-2xl pl-4 md:pl-16'><FaPhone className='mr-2'/> Contact</h3>
             </div>
           </div>

           <div className=' flex h-[300px]'>
             <div className='w-full grid grid-cols-1 gap-4 content-center bg-[#FFEDD5] border-r-4 border-orange-500 text-center content-center'>
              
               <div className="w-28 h-28 rounded-full border-2 border-orange-400 mx-auto mb-4 bg-white">
                  
                </div>
               <h3 className='font-bold text-xl'>{user?.name}</h3>
             </div>
             <div className='w-full pl-8 grid grid-cols-1 gap-2 content-center bg-[#FEF9C3] uppercase py-8'>
                <h3 className='py-4 text-black text-2xl font-semibold'>your activities</h3>
                <h3 className='flex text-blue-400'><TiShoppingCart  className='mr-2'/> Orders</h3>
                <h3 className='flex text-green-400' ><IoStarOutline  className='mr-2'/> Reviews</h3>
                <h3 className='flex text-orange-400'><MdLibraryBooks  className='mr-2'/> Bookings</h3>
                <h3 className='flex text-pink-400'><IoIosWallet  className='mr-2'/> Payments</h3>
             </div>
           </div>
        </div>
    );
};

export default DashboardHome;