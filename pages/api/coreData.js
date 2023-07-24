import queryString from 'query-string';
import tomorrowDailyJson from './tomorrowDaily.json';
import tomorrowCurrent from './tomorrowCurrent.json';
import weatherCodes from './tomorrow-weather-codes.json';
import { SearchRiseSet, Observer } from 'astronomy-engine';
import {getTomorrowData} from "./tomorrowApi";
import {getOpenWeatherData} from './openWeatherApi';
import {getAccuweatherData} from "./accuweatherApi";
import makeEnumerableCopy from './utils/makeEnum';


const lat = 41.18856;
const long = -73.83745;



const fetchAirDate = async (real) => {
    if (real == 'true') {
        console.log('Fetching real air data')
        try {
            const air = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.AIR_VISUAL_API_KEY}`);
            console.log('Real air data fetched succesfully')
            return await air.json();
        }catch (err) {
            console.error('Error fetching real air data: ', err)
            return err;
        }


    } else {
        const air = await fetch('http://localhost:3000/api/pollution');
        return await air.json();
    }
}




export default async function handler(req, res) {
    try {
        const fetchRealData = req.query.real;
        const api = req.query.source;
        let hourly =[], current = {}, daily = [];

        console.log('Begin fetch of data...')

       // const dataJson = await fetchOpenWeatherData(fetchRealData);
        console.log('Got weather data!')

        console.log('Fetching Air data...')
        const air = await fetchAirDate(fetchRealData);
        console.log('Got air data!')

        console.log(req.query)
        if (api === 'tomorrow') {
            ({hourly, current, daily} = await getTomorrowData(lat, long, fetchRealData));

        } else if (api === 'open') {
            ({hourly, current, daily} = await getOpenWeatherData(lat, long, fetchRealData));
        } else if (api === 'accuweather') {
            ({hourly, current, daily} = await getAccuweatherData(lat, long, fetchRealData));
        }

        res.status(200).json({air, hourly, daily, current})
    } catch(err) {
        console.error({serverError: makeEnumerableCopy(err)})
        res.status(500).json({serverError: makeEnumerableCopy(err)})
    }

}


