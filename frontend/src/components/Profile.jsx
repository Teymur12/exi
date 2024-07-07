import React from 'react';
import Header from './header';
import Footer from './footer';
import tate from '../image/atate.jpg';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiWindow2Line } from 'react-icons/ri';
import andrew from '../image/andrew.jpeg';

const Profile = () => {
    return (
        <div>
            <Header />

            <div className='flex justify-center'>
                <div className='grid mt-[20px]'>
                    <div>
                        <div className='flex justify-around flex-wrap gap-y-3'>
                            <div>
                                <img className='rounded-[50%] w-[150px]' src={tate} alt='Profile' />
                            </div>
                            <div className='flex flex-col gap-y-5'>
                                <div className='flex items-center justify-between'>
                                    <span className='font-bold text-2xl'>username</span>
                                    <i className='text-2xl cursor-pointer'><IoSettingsOutline /></i>
                                </div>
                                <div className='flex gap-3 '>
                                    <div className='flex gap-1 cursor-pointer'><p className='font-bold'>0</p> gönderi</div>
                                    <div className='flex gap-1 cursor-pointer'><p className='font-bold'>0</p> takipçi</div>
                                    <div className='flex gap-1 cursor-pointer'><p className='font-bold'>0</p> takip</div>
                                </div>
                                <span className='font-semibold'>Full Name</span>
                                <p className='text-sm'>Description</p>
                            </div>
                        </div>
                        <div className='flex justify-center mt-[96px] border-t border-black pt-[15px]'>
                            <div className='flex items-center gap-1'>
                                <p><RiWindow2Line /></p>
                                <h1>POSTS</h1>
                            </div>
                        </div>

                        <div className='mt-8 flex flex-wrap ml-0 lg:ml-[70px]'>
                            <div className='flex  gap-1 justify-center lg:justify-start flex-wrap max-w-screen-lg'>
                              <a href="">
                                <img className='w-[307px] h-[307px] object-cover' src={andrew} alt='Post' />
                              </a>
                              <a href="">
                                <img className='w-[307px] h-[307px] object-cover' src={andrew} alt='Post' />
                              </a>
                              <a href="">
                                <img className='w-[307px] h-[307px] object-cover' src={andrew} alt='Post' />
                              </a>
                              <a href="">
                                <img className='w-[307px] h-[307px] object-cover' src={andrew} alt='Post' />
                              </a>
                            </div>
                        </div>


                    </div>

                    <div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
