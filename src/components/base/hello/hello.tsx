import { useEffect, useRef, useState } from 'react';
import './hello.css';
var ReactRotatingText = require('react-rotating-text');

export default function Hello() {

    const rotatingText = useRef<typeof ReactRotatingText>(null);
    const names = ['Andres Antillon.', 'axantillon.eth', 'a student.', 'a builder.'];
    const darkColors = ['white', 'blue', 'yellow', 'green'];
    const lightColors = ['black', 'blue', 'red', 'green'];
    const [currentColor, setCurrentColor] = useState<number>(0);
    const [colorScheme, setColorScheme] = useState<Array<string>>(localStorage.getItem('theme') === 'dark' ? darkColors : lightColors)

    
    useEffect(() => {
        window.addEventListener("message", (e) => {
            setColorScheme(localStorage.getItem('theme') === 'dark' ? darkColors : lightColors);
        })
    })



    return (
        <div className={'w-full flex flex-col py-8'}>
            <span className={'text-4xl sm:text-8xl font-extrabold'}>
                {new Date().getHours() < 18 ?
                <> gm, </> 
                :
                <> gn, </>
                }
            </span> 
            <br/>
            <span className={'-mr-4 text-2xl sm:text-6xl'}> 
                <span> i'm </span>
                <ReactRotatingText
                    ref={rotatingText}
                    items={names}
                    color={colorScheme[currentColor]}
                    onDeletingEnd={() => (currentColor === (colorScheme.length - 1) ? setCurrentColor(0) : setCurrentColor(currentColor + 1))}
                />
            </span>
        </div>
    )
}
