import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import Search from "./search";
import { useDispatch } from 'react-redux';
import { setUser } from "../slices/user.slice";
import { useState } from 'react';
import Loader from "./loader";
import more from "../image/more.png"
import home from "../image/home.png"
import search from "../image/search.png"
import social from "../image/social.png"
import reel from "../image/reel.png"
import messenger from "../image/messenger.png"
import heart from "../image/heart.png"
import profilepic from "../image/profilepic.png"
import { RiLogoutBoxRLine } from "react-icons/ri";



export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);

        const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.removeItem("user");
            dispatch(setUser(null));
            setTimeout(() => {
                setLoading(false);
                navigate("/auth/signin");
            }, 1000);
        }

        if (!response.ok) {
            console.log(`error: ${data.error}`);
            setLoading(false);
        }
    };

    return (
        <footer className='bg-white border-b border-gray-300 block sm:hidden'>
            <div className='h-[60px] flex items-center text-center justify-around container mx-auto'>
             

                <nav className=' flex items-center gap-6'>
                    <NavLink to="/">
                        <img className='h-[16px] sm:h-[22px]' src={home} alt="" />
                    </NavLink>
                    <NavLink to="/">
                        <img className='h-[16px] sm:h-[22px]' src={messenger} alt="" />
                    </NavLink>
                    <NavLink to="/createPost">
                        <img className='h-[16px] sm:h-[22px]' src={more} alt="" />
                    </NavLink>
                    <NavLink to="/">
                        <img className='h-[16px] sm:h-[22px]' src={social} alt="" />
                    </NavLink>
                   
                    <NavLink to='/Profile'>
                    <img  className="h-[16px] sm:h-[22px] rounded-full" src={profilepic} alt="" />
                    </NavLink>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Link  className='text-[16px] sm:text-[21px]'>
                        <RiLogoutBoxRLine onClick={handleLogout} />
                        </Link>
                    )}
                </nav>
            </div>
        </footer>
    );
}
