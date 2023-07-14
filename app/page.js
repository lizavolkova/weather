import Image from 'next/image'
import CardWrapper from "./components/CardWrapper";
import MainWeather from "./components/MainWeather";
import DailyWeather from "./components/DailyWeather";
import DetailsWeather from "./components/DetailsWeather";
import AirQuality from "./components/AirQuality";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <CardWrapper>
            <div className="bg-red-600 w-3/4">
               <MainWeather />
            </div>
            <div className="bg-blue-600 w-1/4">
                <DailyWeather />
            </div>
        </CardWrapper>


        <CardWrapper>
            <div className="w-3/4 bg-yellow-600">
                <DetailsWeather/>
            </div>
            <div className="w-1/4 bg-green-600">
                <AirQuality/>
            </div>
        </CardWrapper>

        <CardWrapper>
            RADAR
        </CardWrapper>


    </main>
  )
}
