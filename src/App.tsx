import { useEffect, useState } from "react";
import Ama from "./components/base/ama";
import Hello from "./components/base/hello/hello";
import DarkToggle from "./components/utils/darkToggle";

function App() {

  const [dark, setDark] = useState<boolean>(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    window.addEventListener("message", (e) => {
      setDark(localStorage.getItem('theme') === 'dark')
    })
  })

  return (
    <div className={`${dark && 'dark'} font-space`}>
      <div className={'relative flex flex-col w-screen h-screen text-black dark:text-white bg-gray-100 dark:bg-gray-900'}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 w-full h-24">
          <span> andres antillon </span>
          
          <DarkToggle/>
        </div>

        {/* Body */}
        <div className={'flex flex-col w-full h-full mt-2 sm:mt-40 px-10 sm:px-52 sm:space-y-6'}>

          <Hello/>

          <Ama/>

        </div>

      </div>
    </div>
  );
}

export default App;
