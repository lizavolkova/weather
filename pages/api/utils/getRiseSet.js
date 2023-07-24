import {Observer, SearchRiseSet} from "astronomy-engine";

export default function getRiseSet(body, lat, long, date) {
    const observer = new Observer(lat, long, 1);
    const set  = new Date(SearchRiseSet(body,  observer, -1, date, 300).date);
    const rise  = new Date(SearchRiseSet(body,  observer, +1, date, 300).date);

    return {rise, set};
}