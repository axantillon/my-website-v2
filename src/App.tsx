import { useEffect, useState } from "react";
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
        <div className={`fixed top-6 sm:right-8 right-6`}>
          <DarkToggle/>
        </div>

        {/* Body */}
        <div className={'flex flex-col w-full h-full mt-20 sm:mt-48 px-10 sm:px-32'}>
          <Hello/>
        </div>

      </div>
    </div>
  );
}

export default App;
