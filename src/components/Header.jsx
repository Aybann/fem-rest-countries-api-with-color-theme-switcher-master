import React, { useState, useEffect } from 'react';

const Header = () => {
  const element = document.documentElement
  const [isDark, setIsDark] = useState(false)

  const handleToggleDark = () => {
    if(isDark){
      localStorage.setItem('theme', false)
      setIsDark(false)   
    } else {
      localStorage.setItem('theme', true)
      setIsDark(true)
    }
  }

  useEffect(() => {
    if(localStorage) {
      setIsDark(JSON.parse(localStorage.getItem('theme')) )
      isDark ? element.classList.add('dark') : element.classList.remove('dark')
    } else {
      localStorage.setItem('theme', false)
    }
  })

  return ( 
    <header className="flex justify-between items-center px-4 py-6 shadow-lg md:px-12 dark:bg-slate-900 dark:text-white">
      <h1 className='text-xl font-semibold'>World Dictionary</h1>
      <button onClick={handleToggleDark}>
        {
          isDark 
          ? <span className='flex gap-2 items-center'>
              <svg className="h-6 w-6 text-gray-200"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              Dark
            </span>
          : <span className='flex gap-2 items-center'>
              <svg className="h-5 w-5 text-gray-800"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" /></svg>
              Light
            </span>
        }
      </button>
    </header>
  );
}
 
export default Header;