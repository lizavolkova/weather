import CardStyle from "./Atoms/CardStyle";
import {useState} from "react";
import Today from "./Tables/Today";
import DailyWeatherChart from "./Tables/DailyWeatherChart";
import Hourly from "./Tables/Hourly";

export default function WeatherTable({current, daily, hourly, noaaData}) {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        {
            title: "Hourly",
            component:  <Hourly hourly={hourly}/>
        },
        {
            title: "Today",
            component: <Today current={current} hourly={hourly}/>
        },

        {
            title: "Daily",
            component: <DailyWeatherChart daily={daily} noaaData={noaaData}/>
        }
    ]
    return (
        <div>
            <CardStyle classes="flex-col">
                <ul className="flex">
                    {tabs.map((tab,i) => {
                        return (
                            <li className={`m-2 p-1 cursor-pointer text-xl ${selectedTab === i ? 'border-b' : ''}`} key={i} onClick={() => setSelectedTab(i)}>{tab.title}</li>
                        )
                    })}
                </ul>
                <div className="p-2">
                    {tabs[selectedTab].component}
                </div>
            </CardStyle>
        </div>
    )
}