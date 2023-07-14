export default function MainWeather() {
    return (
        <div className="h-[calc(100vh-300px)] flex flex-col justify-between m-6">
            <div className="text-right">July 13, 2023 | 13:45</div>

            <div>
                <div className="text-right">
                    <div className="text-3xl">Lorem impsum something about the weather</div>
                    <div className="flex justify-end">
                        <div className="flex flex-col">
                            <span>Morning</span>
                            <div>28°</div>
                            <div>ICON</div>
                        </div>
                        <div className="flex flex-col">
                            <span>Afternoon</span>
                            <div>28°</div>
                            <div>ICON</div>
                        </div>
                        <div className="flex flex-col">
                            <span>Evening</span>
                            <div>28°</div>
                            <div>ICON</div>
                        </div>
                    </div>

                    <div className="bg-yellow-600 m-2 text-center rounded-md">Alert</div>
                </div>
                <hr/>
                <div>
                    Hourly
                    <ul>
                        <li>
                            <div className="bg-green-600 w-24 flex flex-col">
                                <span>9:00</span>
                                <hr/>
                                <div>ICON</div>
                                <span>Party Cloudy</span>
                                <div>28°</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


        </div>

    )
}
