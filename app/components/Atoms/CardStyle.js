export default function  CardStyle({children, classes}) {
    return (
        <div className={`backdrop-blur-md border border-slate-400 rounded-xl m-2 p-4 flex ${classes}`}>
            {children}
        </div>
    )
}