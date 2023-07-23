import CardStyle from "./CardStyle";
import IconSun from "../icons/IconSun";

export default function InfoCard({title, classes, children, icon, footer,footerLogo, footerUrl}) {
    return (
        <CardStyle classes={classes} >
            <div className={`backdrop-blur flex flex-col h-full ${footer ? 'justify-between' : ''}`}>
                <div className="capitalize mb-4 text-md md:text-xl flex justify-between">
                    <div className=" text-slate-400 text-sm uppercase">{title}</div>
                    {icon && <div className="text-md md:text-xl text-slate-400">{icon}</div>}
                </div>
                <div className="flex">{children}</div>
                {footer && <div className="flex justify-end opacity-50 text-xs pt-6 md:pt-4" ><a className="flex items-center" href={footerUrl} target="_blank"><div>{footer}</div><img className="pl-4 max-h-[25px] w-auto" src={footerLogo} /></a></div>}
            </div>
        </CardStyle>

    )
}