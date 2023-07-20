const Planet = ({planet, direction, height}) => {
    return (
        <div className="flex">
            <div>ICON</div>
            <div>{planet}</div>
            <div>{direction}</div>
            <div>{height}</div>
        </div>
    )
}

export default function PlanetsVisible({data}) {
    const excludeList = ['sun', 'moon', 'earth'];

    const visiblePlanets = data.table.rows.filter(body => {
        const altitude = body.cells[0].position.horizonal.altitude.degrees;
        const azimuth = body.cells[0].position.horizonal.azimuth;

        return parseFloat(altitude) > 0 && excludeList.indexOf(body.entry.id) < 0
    })

    return (
         <div>
             <div>VISIBLE PLANETS</div>
             <div>
                 {visiblePlanets.map(planet => {

                     const altitude = planet.cells[0].position.horizonal.altitude.degrees;
                     const azimuth = planet.cells[0].position.horizonal.azimuth.degrees;
                     const name = planet.entry.name;

                     console.log(altitude)
                     console.log(azimuth)
                     console.log(name)
                    return <Planet planet={name} direction={azimuth} height={altitude}  />
                 })}
             </div>
         </div>
    )
}