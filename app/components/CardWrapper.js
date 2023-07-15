import Image from 'next/image'

export default function CardWrapper({children, background, classes}) {
    return (

            <div className={`bg-slate-600 w-full flex rounded-lg m-2 bg-cover ${classes}`} style={{backgroundImage: `url(${background})`}} >
                {children}
            </div>

    )
}
