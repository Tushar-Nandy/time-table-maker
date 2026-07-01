import { useState } from "react"

import teachers from "../data/teachers"
import subjects from "../data/subjects"

function LectureModal({
    selectedCells,
    setSelectedCells,
    timetable,
    setTimetable,
}){
    const [subject, setSubject] = useState("")
    const [teacher, setTeacher] = useState("")


    if(!selectedCells){
        return null
    }

    const handleSave = () =>{
        if(subject === "" || teacher === ""){
            alert("Please select both subject and teacher")
            return
        }
        console.log(selectedCells)
        setTimetable((prev)=>({
            ...prev,

            [selectedCells.day]:{
                    ...prev[selectedCells.day],
                    [selectedCells.slotId]:{
                    subjectId : subject,
                    teacherId: teacher,
                }
            }

        }))

        setSelectedCells(null)
        setSubject("")
        setTeacher("")
    }

    return(
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center"
        onClick = {()=> setSelectedCells(null)}
        >
            <div className = "bg-white rounded-xl p-6 w-[400px] shadow-xl"
            onClick = {(e)=> e.stopPropagation()}
            >
                <h2 className = "text-2xl font-bold mb-6">
                    Edit Lecture
                </h2>

                {/* Subjects */}
                <div className = "mb-4">
                    <label className="block mb-2 font-medium">
                         Subject
                    </label>

                    <select
                        value={subject}
                        onChange={(e) => setSubject(Number(e.target.value))}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">
                            Select Subject
                        </option>

                        {subjects.map((sub) => (
                            <option
                                key={sub.id}
                                value={sub.id}
                            >
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Teacher */}
                <div className = "mb-4">
                    <label className="block mb-2 font-medium">
                        Teacher
                    </label>

                    <select
                        value={teacher}
                        onChange={(e) => setTeacher(Number(e.target.value))}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">
                            Select Teacher
                        </option>

                        {teachers.map((t) => (
                            <option
                                key={t.id}
                                value={t.id}
                            >
                                {t.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Buttons */}
                <div className = "flex justify-end gap-3">
                    <button className = "px-4 py-2 rounded-lg bg-gray-300"
                    onClick = {()=> setSelectedCells(null)}>Cancel</button>
                    <button className = "px-4 py-2 rounded-lg bg-blue-500 text-white"
                    onClick = {handleSave}
                    >Save</button>
                </div>

            </div>

        </div>
    )
}

export default LectureModal