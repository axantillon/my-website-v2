import { useEffect, useState } from "react";
import { FiMoon, FiSun } from 'react-icons/fi';

export default function DarkToggle() {

    let theme = localStorage.getItem('theme');

    const [dark, setDark] = useState<boolean>(theme === 'dark');

    useEffect(() => {
        window.postMessage('shut up, i know this is bad')
        localStorage.setItem('theme', dark ? 'dark': 'light');
    }, [dark])

    return (
        <>
            <div className="h-10 w-10 flex items-center justify-center rounded-full border border-black dark:border-white text-white dark:text-black bg-gray-900 dark:bg-gray-100 cursor-pointer" onClick={() => (setDark(!dark))}>
                { dark &&
                    <FiMoon/>
                }
                { !dark && 
                    <FiSun/>
                }
            </div>
        </>
    )
}
