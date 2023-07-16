export default function CardWrapper({children, background, classes}) {
    return (
        <div className={`bg-slate-600 w-full flex md:rounded-lg m-0 md:m-2 bg-cover ${classes}`} style={{backgroundImage: `url(${background})`}} >
            {children}
        </div>
    )
}
