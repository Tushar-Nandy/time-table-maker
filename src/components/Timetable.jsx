import subjects from "../data/subjects.js"
import teachers from "../data/teachers.js"

function TimeTable({ currentTable, setSelectedCells }){

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    if (!currentTable) {
        return null
    }

    const formatTime = (time) =>{
        if(!time) return "--:--"
        const [hours,minutes] = time.split(":")
        let hour = Number(hours)
        const period = hour >= 12 ? "PM" : "AM"

        hour = hour % 12
        if (hour === 0) hour = 12

        return `${hour}:${minutes} ${period}`
    }

    return(
        <div className = "max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 overflow-x-auto">
            <h2 className = "text-2xl font-bold mb-6">
                {currentTable.title || "Untitled Timetable"}
            </h2>
            
            <table className = "w-full border border-gray-300 border-collapse">
                <thead>
                    <tr>
                        <th className = "border border-gray-300 p-3 bg-gray-100">
                            Time
                        </th>

                        {days.map((day) => (
                            <th
                                key = {day}
                                className = "border border-gray-300 p-3 bg-gray-100"
                            >
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentTable.timeSlots.map((slot)=>(
                        <tr key = {slot.id}>
                            <td className = "border border-gray-300 p-3 font-medium">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </td>

                            {days.map((day) => {
                                const lecture = currentTable.timetable[day]?.[slot.id]
                                const subject = subjects.find(
                                    (sub) => sub.id ===lecture?.subjectId
                                )

                                const teacher = teachers.find(
                                    (t) => t.id === lecture?.teacherId
                                )

                                return(
                                <td 
                                 key = {day}
                                 className = "border border-gray-300 p-3 min-h-16 cursor-pointer hover:bg-blue-50 transition-colors align-top" 
                                 onClick = {() =>setSelectedCells({
                                    day,
                                    slotId: slot.id,
                                 })}
                                 style ={{
                                    backgroundColor: subject?.color || "white"
                                 }}
                                 >
                                    {
                                        lecture ?(
                                            <>
                                                <div className = "font-semibold">
                                                    {subject?.name}
                                                </div>
                                                <div className = "text-sm">
                                                    ({teacher?.name})
                                                </div>
                                            </>
                                        ) : (
                                            <div className = "flex justify-center items-center h-full text-xl text-gray-400">
                                                +
                                            </div>
                                        )
                                    }
                                    
                                </td>)
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* {selectedCells && (
                <div className = "mt-4 p-4 bg-blue-100 rounded-lg">
                    <p>Selected Day: {selectedCells.day}</p>
                    <p>Selected Slot ID: {selectedCells.slotId}</p>
                </div>
            )} */}

        </div>
    )
}

export default TimeTable