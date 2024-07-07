import React from 'react'
import tate from "../image/atate.jpg"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const story = () => {
  return (
    <div>
      <div className='w-[610px] h-[115px] relative  overflow-hidden flex flex-row items-center justify-center transition-width duration-400'>
        <div className='mr-[10px] ml-[10px] hover:left-64 transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white relative'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" text-center text-xs font-medium text-gray-500 src="" alt="" />
            <p className='absolute right-0 bottom-3 border flex items-center justify-center rounded-[50%] w-[25px] h-[25px] bg-blue-500 text-white text-[15px]'>+</p>
            <p className='text-center text-xs font-medium text-gray-500'>Add Story</p>
          </button>
        </div>
        <i><FaAngleLeft /></i>
        <div className='mr-[10px] ml-[10px]  transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <div className='mr-[10px] ml-[10px]  transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <div className='mr-[10px] ml-[10px] transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <div className='mr-[10px] ml-[10px] transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <div className='mr-[10px] ml-[10px] transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <div className='mr-[10px] ml-[10px] transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <div className='mr-[10px] ml-[10px] transition-left duration-400 ease-in-out'>
          <button className='border border-none bg-white'>
            <img className="w-[60px] h-[60px] rounded-[50%] border border-red-500 object-cover" src={tate} alt="" />
            <p className='text-center text-xs font-medium text-gray-500'>Hassan</p>
          </button>
        </div>
        <i><FaAngleRight /></i>
      </div>
    </div>

  )
}

export default story