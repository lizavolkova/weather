import CardStyle from "./CardStyle";
import IconSun from "../icons/IconSun";

export default function InfoCard({title, classes, children, icon}) {
    return (
        <CardStyle classes={classes} >
            <div className="backdrop-blur">
                <div className="capitalize mb-4 text-xl flex justify-between">
                    <div className="border-b">{title}</div>
                    {icon && <div className="text-3xl">{icon}</div>}
                </div>
                <div>{children}</div>
            </div>
        </CardStyle>

    )
}