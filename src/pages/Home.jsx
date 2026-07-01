import {useState} from "react"

import TimeTable from "../components/Timetable"
import SetupPanel from "../components/SetupPanel"
import LectureModal from "../components/LectureModal"

function Home(){
    const [classTitle, setClassTitle] = useState("")
    const [timeSlots, setTimeSlots] = useState([
        {
            id: crypto.randomUUID(),
            startTime: "",
            endTime: "",
        }
    ])
    const [timetable,setTimetable] = useState({
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
    })

    const [selectedCells, setSelectedCells] = useState(null)

    return(
        <div className= "min-h-screen bg-slate-100 p-8">
            <SetupPanel
                classTitle = {classTitle}
                setClassTitle = {setClassTitle}
                timeSlots = {timeSlots}
                setTimeSlots = {setTimeSlots}
            />
            <TimeTable
                classTitle = {classTitle}
                timeSlots = {timeSlots}
                timetable = {timetable}
                selectedCells = {selectedCells}
                setSelectedCells = {setSelectedCells}
            />

            <LectureModal
                selectedCells = {selectedCells}
                setSelectedCells = {setSelectedCells}
                timetable = {timetable}
                setTimetable = {setTimetable}
            />
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto">
                {JSON.stringify(timetable, null, 2)}
            </pre>
        </div>
    )
}

export default Home