import { useEffect, useState } from "react"
import { FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi"
import { getGithubData, repo } from "../../utils/githubAPI"

export default function Projects() {

    const [repos, setRepos] = useState<repo[] | undefined>()

    async function getData(): Promise<repo[] | undefined> {
        return await getGithubData()
    }

    useEffect(() => {
        if(repos === undefined) {
            getData().then((res) => {
                setRepos(res);
            });
        }
    }, [repos])

    return (
        <div className="flex flex-col w-full ">
            <span className='text-2xl'> some of my projects </span>
            <div className="flex flex-col w-full py-4 space-y-2">
                {repos ?
                    <>
                        {repos.map((repo, i) => <RepoCard key={i} {...repo}/>)}
                    </>
                :
                    <div className="w-full h-28"></div>
                }
            </div>
        </div>
    )
}

function RepoCard({ repo, desc, url, stars, lang }: repo) {

    const langColors: {[id: string]: string} = {
        "vue": "green-500",
        "javascript": "yellow-300",
        "jupyter notebook": "yellow-500",
        "python": "purple-600",
        "typescript": "blue-600",
        "undef": 'black'
    }

    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div onClick={() => {setExpanded(!expanded)}}  className={`relative flex justify-between w-full ${expanded ? 'h-full' : 'h-16'} border border-black dark:border-white transition-all duration-800 ease-in-out cursor-pointer`}>
            <div className='flex flex-col w-full h-full'>
                <div className="flex items-center justify-between w-full h-16 pl-4 pr-6">
                    <div className="flex flex-grow items-center h-full space-x-2">
                        <span> {repo} </span>
                        {desc && 
                            <>
                                <span> - </span>
                                <span className={'w-3/4 truncate'}> {desc} </span>
                            </>
                        }
                    </div>

                    <div className="flex items-center w-min h-full space-x-2">
                        <span className="underline cursor-pointer"> <a href={url} target='_blank' rel='noreferrer'> github </a> </span>
                        <div className="flex items-center justify-center w-8 h-8 mt-1 dark:text-white">
                            {expanded ? 
                                <FiChevronUp/>
                            :
                                <FiChevronDown/>
                            }
                        </div>
                    </div>
                </div>
                
                <div className={`flex items-center w-full ${expanded ? 'flex': 'hidden'} px-8 pb-6 space-x-2`}>
                    <div className="flex items-center h-full mt-1 space-x-1"> 
                        <FiStar/> 
                        <span> {stars} </span> 
                    </div> 
                    <span> - </span>
                    <span className={`font-bold ${'text-'+langColors[lang]}`}> {lang} </span>
                </div>
            </div>
            
            <div className={`absolute right-0 w-4 h-full ${'bg-'+langColors[lang]}`}></div>
        </div>
    )
}
