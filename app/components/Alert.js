import React, { useState } from 'react';
import Modal from "./Atoms/Modal";
const weatherID = 800;
import {getDay} from "../utils/getDay";
import {getMonth} from "../utils/getMonth";
const bgColor = (severity) => {
    switch(severity) {
        case ("Severe" || "Extreme"):
            return 'bg-red-600'
        default:
            return 'bg-yellow-600'
    }
}

export default function Alert({alert}) {
    console.log(alert)
    const [showAlertModal, setShowAlertModal] = useState(false);
    const {properties} = alert;
    const endDate = new Date(properties.ends);
    return (
        <div >
            <div className={`${bgColor(properties.severity)} m-2 p-2 text-center rounded-md cursor-pointer`} onClick={() => setShowAlertModal(true)}>{properties.event}</div>
            <Modal showModal={showAlertModal} setShowModal={() => setShowAlertModal(false)} header={`Weather Alert: ${properties.event}`}>
                {properties.parameters.NWSheadline?.map(headline => {
                    return <div key={headline}>{headline}</div>
                })}
                <p>Until time</p>
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
