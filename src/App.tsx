import { useEffect, useState } from "react";
import DarkToggle from "./components/base/darkToggle";

function App() {

  const [dark, setDark] = useState<boolean>(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log('hey')
      setDark(localStorage.getItem('theme') === 'dark')
    })
  })

  return (
    <div className={`${dark && 'dark'} w-screen h-screen font-space`}>
      <div className={'relative w-full h-full text-black dark:text-white bg-gray-100 dark:bg-gray-900'}>

        {/* Header */}
        <div className={`fixed top-6 sm:right-8 right-6`}>
          <DarkToggle/>
        </div>

        {/* Body */}
        <div className={''}>

        </div>

      </div>
    </div>
  );
}

export default App;
