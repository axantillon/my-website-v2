import { useEffect, useState } from "react";
import Ama from "./components/base/ama";
import Hello from "./components/base/hello/hello";
import Projects from "./components/base/projects";
import DarkToggle from "./components/utils/darkToggle";

function App() {

  const [dark, setDark] = useState<boolean>(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    window.addEventListener("message", (e) => {
      setDark(localStorage.getItem('theme') === 'dark')
    })
  })

  return (
    <div className={`${dark && 'dark'} font-space min-h-screen`}>
      <div className={'relative flex flex-col pb-24 text-black dark:text-white bg-gray-100 dark:bg-gray-900'}>

        {/* Welcome Page */}
        <div className="flex-col w-full h-screen ">
          <div className="flex items-center justify-between w-full h-24 px-6">
            <span> andres antillon </span>
          
            <DarkToggle/>
          </div>          

          <div className="flex-col w-full h-full px-32 pt-44 space-y-12">
            <Hello/>

            <Ama/>
          </div>
        </div>

        {/* Body */}
        <div className={'flex flex-col w-full h-full mt-2 px-10 sm:px-32 sm:space-y-28'}>

          <Projects/>

        </div>

      </div>
    </div>
  );
}

export default App;
