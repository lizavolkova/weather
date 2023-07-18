import CardStyle from "./CardStyle";

export default function InfoCard({title, classes, children}) {
    return (
        <CardStyle classes={classes} >
            <div className="backdrop-blur">
                <div className="capitalize">{title}</div>
                <div>{children}</div>
            </div>
        </CardStyle>

    )
}