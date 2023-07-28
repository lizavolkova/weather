import {useContext} from "react";
import {ThemeContext} from "../../page";

const getThemeColor = (theme) => {
    switch (true) {
        case theme === 'night':
            return 'bg-violet-900'
        case theme === 'rain':
            return 'bg-gray-600'
        case theme === 'clear':
            return 'bg-sky-800'
        default:
            return 'bg-slate-800'
    }
}
export default function  CardStyle({children, classes}) {
    const {theme} = useContext(ThemeContext);

    return (
        <div className={`backdrop-blur-md border border-slate-400 rounded-xl m-2 p-4 md:p-6 flex ${getThemeColor(theme)} ${classes}`}>
            {children}
        </div>
    )
}