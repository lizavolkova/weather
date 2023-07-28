import React, { useState } from 'react';
import Modal from "./Atoms/Modal";
const weatherID = 800;
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
import {getDate} from "../utils/getDate";
const bgColor = (severity) => {
    switch(severity) {
        case ("Severe"):
            return 'bg-red-600'
        case("Extreme"):
            return 'bg-red-600'
        default:
            return 'bg-yellow-600'
    }
}

export default function Alert({alert}) {
    const [showAlertModal, setShowAlertModal] = useState(false);
    const {properties} = alert;
    const endDate = new Date(alert.properties.expires);
    const startDate = new Date(alert.properties.effective);
    const end = `${getDay(endDate)}, ${getMonth(endDate)} ${endDate.toLocaleTimeString()}`;
    const start = `${getDay(startDate)}, ${getMonth(startDate)} ${startDate.toLocaleTimeString()}`;

    return (
        <div >
            <div className={`${bgColor(properties.severity)} m-2 p-2 text-center rounded-md cursor-pointer`} onClick={() => setShowAlertModal(true)}>{properties.event} <span className="text-xs text-slate-200">until {end}</span></div>
            <Modal showModal={showAlertModal} setShowModal={() => setShowAlertModal(false)} header={`Weather Alert: ${properties.event}`}>
                {properties.parameters.NWSheadline?.map(headline => {
                    return <div key={headline}>{headline}</div>
                })}
                <p>From: {start} To: {end}</p>
                <p className="font-bold">Affected Area</p>
                <p>{properties.areaDesc}</p>
                <p className="font-bold">Description</p>
                <p>{properties.description}</p>
                <p className="font-bold">PRECAUTIONARY/PREPAREDNESS ACTIONS</p>
                <p>{properties.instruction}</p>
            </Modal>
        </div>

    )
}
