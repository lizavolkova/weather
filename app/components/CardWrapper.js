export default function CardWrapper({children, background, classes, bgColor}) {
    return (
        <div className={`${bgColor} w-full flex md:rounded-lg m-0 md:m-2 bg-cover ${classes}`} style={{backgroundImage: `url(${background})`}} >
            {children}
        </div>
    )
}
