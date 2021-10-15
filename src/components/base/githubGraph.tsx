import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import Dropdown from 'react-dropdown';
import { FiChevronDown, FiChevronUp, FiGithub } from "react-icons/fi";
import { getContributionData } from "../../utils/githubAPI";

export default function GithubGraph() {

    const [yearList, setYearList] = useState<Array<string>>()
    const [year, setYear] = useState<number>(0)
    const [contributions, setContributions] = useState<any>()

    const [graph, setGraph] = useState<any>()
    const [redraw, triggerRedraw] = useState<boolean>(false);
    
    const options: ChartOptions = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    useEffect(() => {
        getContributionData().then((res) => {
            if(yearList === undefined || graph === undefined){
                setContributions(res?.months);
                setGraph({
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        lineTension: 0.2,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'rgb(0, 170, 255)',
                        pointBorderColor: 'rgb(0, 170, 255)',
                        pointBackgroundColor: 'rgb(0, 170, 255)',
                        borderWidth: 1,
                        spanGaps: true,
                        data: res?.months[year]
                    }]
                })
                setYearList(res?.yearList);
            }
        })

        if (redraw) {
            setTimeout(() => {
                triggerRedraw(!redraw);
            }, 100);
        }
    }, [year, graph, yearList, contributions, redraw])

    function onYearChange(option: any) {
        if(yearList) {
            setYear(yearList.findIndex((o) => (o === option.value)))
            console.log(contributions[year])
            setGraph({
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    lineTension: 0.2,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgb(0, 170, 255)',
                    pointBorderColor: 'rgb(0, 170, 255)',
                    pointBackgroundColor: 'rgb(0, 170, 255)',
                    borderWidth: 1,
                    spanGaps: true,
                    data: contributions[year]
                }]
            })
            if (!redraw) {
                triggerRedraw(!redraw);
            }
        }
    }

    return (
        <div className="w-full space-y-4"> 
            <div className="flex items-center space-x-2 text-xl sm:text-2xl ">
                <span> a chart of contributions </span>
                <div className="flex items-center justify-center mt-1">
                    <FiGithub/>
                </div>   
            </div>
            { yearList &&
                <div className="relative w-full h-10">
                    <Dropdown className={'absoulute z-10 w-20 px-2 border border-black dark:border-white cursor-pointer'} controlClassName={'flex items-center justify-between'} options={yearList} onChange={onYearChange} value={yearList[year]} placeholder="Select an option" arrowClosed={<FiChevronDown/>} arrowOpen={<FiChevronUp/>} />
                </div>
            }
            <div className="w-full sm:w-5/12">
                <Line data={graph} options={options} redraw={redraw}/>
            </div>
        </div>
    )
}
