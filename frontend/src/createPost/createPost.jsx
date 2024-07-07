import React, { useRef, useState } from 'react'
import Header from 'components/header'
import { Navigate, useNavigate } from 'react-router'
const CreatePost = () => {
    const navigate = useNavigate()

    const bodyRef = useRef()
    const titleRef = useRef()

    const handleSubmit = async (event) => {

        const bodyRefCurrentValue = bodyRef.current.value.trim()
        const titleRefCurrentValue = titleRef.current.value.trim()

        event.preventDefault();


        try {
            const response = await fetch('/api/post/createpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: bodyRefCurrentValue, title: titleRefCurrentValue }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log('Server error:', errorMessage);
            } else {
                const data = await response.json();
                console.log(data);
                alert("ugurla yaratdiz")
                navigate("/")
            }


        } catch (error) {
            console.error('Error during sign in:', error);

        }
    };


    return (
        <div>
            <Header />
            <div className='flex justify-center mt-[150px]'>
                <div className='bg-zinc-100 border w-[500px] h-[375px]'>
                    <div className=" grid gap-y-3">
                        <div className=" px-[40px] pt-8 pb-6">
                            <div className="flex justify-center mb-8" href="#">
                                <p className='font-semibold text-[30px]'>Create Post</p>
                            </div>
                            <form className="grid gap-y-6">
                                <label className="relative flex bg-white border focus-within:border-gray-400 rounded-sm">
                                    <input
                                        placeholder='Title'
                                        className="bg-transparent px-2 outline:none w-full h-[38px] text-s valid:pt-[10px] peer"
                                        type='text'
                                        ref={titleRef}
                                    />
                                </label>
                                <label className="relative flex bg-white border focus-within:border-gray-400 rounded-sm">
                                    <input placeholder='Description'
                                        className="bg-transparent px-2 outline:none w-full h-[38px] text-s valid:pt-[10px] peer"
                                        type='text'
                                        ref={bodyRef}

                                    />
                                </label>
                                {/* <label>

                                    <input placeholder='img' type="text" />
                                </label> */}
                                <button onClick={handleSubmit} className='border bg-brand w-[150px] h-[40px] text-white font-medium'>
                                    Post
                                </button>

                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>)
}



export default CreatePost