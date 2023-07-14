import Image from 'next/image'

export default function CardWrapper({children}) {
    return (

            <div className="bg-slate-600 w-full flex rounded-lg m-2 p-2">
                {children}
            </div>

    )
}
