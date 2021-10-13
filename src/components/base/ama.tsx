import React, { useRef, useState } from "react";
import { FiCornerDownLeft } from "react-icons/fi";
import { getAnswer } from "../../utils/robertaAPI";

export default function Ama() {

    let input = useRef<HTMLInputElement>(null);
    const [answer, setAnswer] = useState<string | undefined | unknown>(undefined);
    const sampleQs = [
            "Where did you grow up?",
            "How old are you?",
            "What are your passions?",
            "When were you born?",
        ]

    async function askQ() {
        await getAnswer(input.current ? input.current?.value.replace("?", "") : '').then((res) => {
            console.log(res?.data)
            setAnswer(res?.data.answer);
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleEnter = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            askQ();
        }
    }

    return (
        <div className="w-full space-y-2 sm:space-y-1">
            <span className={'text-xl sm:text-2xl'}> ask me something. </span>
            <br/>
            <div className="w-full sm:flex sm:space-x-6 space-y-2 sm:space-y-1">
                <div className="flex w-11/12 sm:w-96 h-8 px-2 py-1 border border-black dark:text-black bg-gray-100">
                    <input ref={input} 
                        onKeyDown={handleEnter}
                        type="text" placeholder={sampleQs[Math.floor(Math.random() * sampleQs.length)]} 
                        className={'w-full border-none outline-none bg-transparent'} 
                    />
                    <div className="flex items-center cursor-pointer">
                        <FiCornerDownLeft onClick={askQ}/>
                    </div>
                </div>
                <div className="flex items-center text-lg sm:text-xl text-gray-600">
                    {answer !== undefined ? 
                        <span> {answer} </span>
                    :
                        <span> really anything... </span>
                    }
                </div>
            </div>
        </div>
    )
}
