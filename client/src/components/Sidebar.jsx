import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState, useEffect, useRef } from 'react'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>

            <div className='pb-5'>
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <img src={assets.logo} alt="Logo" className='max-w-40' />

                    {/* Menu */}
                    <div className="relative" ref={menuRef}>
                        <img
                            src={assets.menu_icon}
                            alt="Menu"
                            className='max-h-5 cursor-pointer'
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(prev => !prev);
                            }}
                        />

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute right-0 mt-2 w-40 bg-[#282142] rounded-lg shadow-lg p-3 z-50">
                                <p
                                    onClick={() => {
                                        navigate('/profile');
                                        setOpen(false);
                                    }}
                                    className="cursor-pointer text-sm hover:text-gray-300"
                                >
                                    Edit Profile
                                </p>

                                <hr className="my-2 border-t border-gray-500" />

                                <p
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                    }}
                                    className="cursor-pointer text-sm hover:text-gray-300"
                                >
                                    Logout
                                </p>
                            </div>
                        )}
                    </div>

                </div>

                <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
                    <img src={assets.search_icon} alt="Search" className='w-3' />
                    <input type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...' />
                </div>
            </div>

            <div className="flex flex-col">
                {userDummyData.map((user, index)=> (
                <div 
                    key={user._id} // ✅ FIX key warning
                    onClick={()=> {setSelectedUser(user)}} 
                    className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}
                >
                    <img src={user?.profilePic || assets.avatar_icon} alt="ProfilePic" className='w-[35px] aspect-[1/1] rounded-full' />
                    <div className="flex flex-col leading-5">
                        <p>{user.fullName}</p>
                        {
                            index < 3 
                            ? <span className='text-green-400 text-xs'>Online</span> 
                            : <span className='text-neutral-400 text-xs'>Offline</span>
                        }
                    </div>
                    {index > 2 && (
                        <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                            {index}
                        </p>
                    )}
                </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar