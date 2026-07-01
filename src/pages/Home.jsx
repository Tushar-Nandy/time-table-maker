import {useState} from "react"

import TimeTable from "../components/Timetable"
import SetupPanel from "../components/SetupPanel"
import LectureModal from "../components/LectureModal"

function Home(){
    const [tables, setTables] = useState([
        {
            id: crypto.randomUUID(),
            title: "",
            timeSlots: [
                {
                    id: crypto.randomUUID(),
                    startTime: "",
                    endTime: "",
                }
            ],
            
            timetable : {
                Monday: {},
                Tuesday: {},
                Wednesday: {},
                Thursday: {},
                Friday: {},
                Saturday: {},
            }
        }
    ])
    const [currentTableId, setCurrentTableId] = useState(tables[0].id)

    const currentTable = tables.find((table)=> table.id === currentTableId)

    const [selectedCells, setSelectedCells] = useState(null)

    return(
        <div className= "min-h-screen bg-slate-100 p-8">
            <SetupPanel
                currentTable = {currentTable}
                setTables = {setTables}
            />
            <TimeTable
                currentTable = {currentTable}
                setSelectedCells = {setSelectedCells}
            />

            <LectureModal
                currentTable = {currentTable}
                tables = {tables}
                setTables = {setTables}
                selectedCells = {selectedCells}
                setSelectedCells = {setSelectedCells}
            />
        </div>
    )
}

export default Home