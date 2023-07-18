import React, { useState } from 'react';

export default function SliderDetails({children, arr}) {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEl, setSelectedEl] = useState(null);

    const selectElement = (i) => {
        const key = selectedEl === i ? null : i;
        setSelectedEl(key);
        setShowDetails(key != null);
    }

    const detailsData = arr[selectedEl];

    return (
        <div>
            <div className="flex">
                {arr.map((data,i) => {
                    return (
                        <div className="p-10" key={i} onClick={() => selectElement(i)}>el</div>
                    )
                })}
            </div>

            {showDetails && <div>
                key: {selectedEl}
                <div>{detailsData.dt}</div>
            </div>}
        </div>

    )
}