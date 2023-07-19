export default function RangeBar({percent}) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{width: `${percent}%`}}></div>
        </div>
    )
}