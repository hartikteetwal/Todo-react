import React from 'react'

function navbar() {
  return (
    <nav className='flex justify-between bg-[#564da8] text-white h-[8vh] items-center'>
        <div className="logo">
            <span className='font-bold text-xl mx-4'>iTask</span>
        </div>

      <ul className="flex gap-5 mr-4">
        <li className='lm:block hidden cursor-pointer hover:font-bold duration-300 transition-all'>Home</li>
        <li className='lm:block hidden cursor-pointer hover:font-bold duration-300 transition-all'>Your Tasks</li>
        <li className='lm:block hidden cursor-pointer hover:font-bold duration-300 transition-all'>About</li>
        <li className='block lm:hidden cursor-pointer hover:font-bold duration-300 transition-all'><span class="material-symbols-outlined">
menu
</span></li>
      </ul>

    </nav>
  )
}

export default navbar
