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
        <div className="flex flex-col w-full mt-6 sm:mt-0">
            <span className='text-xl sm:text-2xl'> some of my projects </span>
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

function RepoCard({ repo, desc, url, stars, lang, langColor }: repo) {

    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div onClick={() => {setExpanded(!expanded)}}  className={`relative flex justify-between w-full ${expanded ? 'h-full' : 'h-12 sm:h-16'} border border-black dark:border-white text-xs sm:text-base transition-all duration-800 ease-in-out cursor-pointer`}>
            <div className='flex flex-col w-full h-full'>
                <div className="flex items-center justify-between w-full h-12 sm:h-16 pl-4 pr-6">
                    <div className="flex flex-grow items-center h-full space-x-2">
                        <span> {repo} </span>
                        {desc && 
                            <div className="hidden sm:flex">
                                <span> - </span>
                                <span className={'w-3/4 truncate'}> {desc} </span>
                            </div>
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
                
                <div className={`flex-col w-full ${expanded ? 'flex': 'hidden'} -mt-2 sm:mt-0 px-8 pb-4 sm:pb-6 space-y-2`}>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center h-full mt-1 space-x-1"> 
                            <FiStar/> 
                            <span> {stars} </span> 
                        </div> 
                        <span> - </span>
                        <span className={`font-bold`} style={{color: langColor}}> {lang} </span>
                    </div>
                    <div className="sm:hidden flex">
                        {desc && 
                            <div className="sm:hidden flex">
                                <span> - </span>
                                <span className={'w-full'}> {desc} </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
            <div className={`absolute right-0 w-4 h-full`} style={{backgroundColor: langColor}}></div>
        </div>
    )
}
