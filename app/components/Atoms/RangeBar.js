export default function RangeBar({percent, color}) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`${color ? color : 'bg-blue-600'} h-2.5 rounded-full `} style={{width: `${percent}%`}}></div>
        </div>
    )
}