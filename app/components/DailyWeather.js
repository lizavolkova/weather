import Image from 'next/image'

export default function DailyWeather() {
    return (

        <div className="m-6">
            <div>New York, NY</div>
            <div>ICON</div>
            <div className="text-6xl">28°</div>
            <div>Fair</div>
            <div>Day 32° • Night 22°</div>

            <hr/>

            <div className="flex">
                <div className="w-1/3">Today</div>
                <div className="w-1/3">5 Day</div>
                <div className="w-1/3">10 Day</div>
            </div>
            <div className="flex">
                <ul>
                    <li className="flex">
                        <div>ICON</div>
                        <div className="flex flex-col">
                            <span>Friday, April 12</span>
                            <span>Heavy Rain</span>
                        </div>
                        <div className="flex flex-col">
                            <span>9°</span>
                            <span>16°</span>
                        </div>

                    </li>
                </ul>
            </div>
        </div>

    )
}
