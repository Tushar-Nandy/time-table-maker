import { useState, useEffect } from "react"

import teachers from "../data/teachers"
import subjects from "../data/subjects"

function LectureModal({
    currentTable,
    setTables,
    selectedCells,
    setSelectedCells
}){
    const [subject, setSubject] = useState("")
    const [teacher, setTeacher] = useState("")
    const [note, setNote] = useState("")

    const updateCurrentTable = (updatedTable) => {
        setTables((prevTables) =>
            prevTables.map((table)=>
                table.id === currentTable.id ? updatedTable : table
            )
        )
    }

    useEffect(()=>{
        if (!selectedCells) return;

        const lecture = currentTable.timetable[selectedCells.day]?.[selectedCells.slotId]

        if(lecture){
            setSubject(lecture.subjectId)
            setTeacher(lecture.teacherId)
            setNote(lecture.note || "")
        }else{
            setSubject("")
            setTeacher("")
            setNote("")
        }
    }, [selectedCells, currentTable?.timetable])


    const closeModal = () =>{
        setSelectedCells(null)
        setSubject("")
        setTeacher("")
        setNote("")
    }

    const handleSave = () =>{
        if(subject === "" || teacher === ""){
            alert("Please select both subject and teacher")
            return
        }
        console.log(selectedCells)

        updateCurrentTable({
            ...currentTable,
            timetable: {
                ...currentTable.timetable,
                [selectedCells.day]: {
                    ...currentTable.timetable[selectedCells.day],
                    [selectedCells.slotId]:{
                        subjectId: subject,
                        teacherId: teacher,
                        note: note.trim(),
                    }
                }
            }
        })

        closeModal()
    }

    if(!selectedCells || !currentTable) {
        return null
    }

    const lecture = currentTable.timetable[selectedCells.day]?.[selectedCells.slotId]

    return(
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center"
        onClick = {()=> {closeModal()}}
        >
            <div className = "bg-white rounded-xl p-4 sm:p-6 w-[95%] max-w-md shadow-xl"
            onClick = {(e)=> e.stopPropagation()}
            >
                <h2 className = "text-2xl font-bold mb-6">
                    {lecture? "Edit Lecture" : "Add Lecture"}
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
                <div className="mb-4">
    <label className="block mb-2 font-medium">
        Notes (Optional)
    </label>

    <input
        type="text"
        rows={2}
        placeholder="Chapter 5 Test, Practical, Revision..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 resize-none"
    />
</div>
                
                {/* Buttons */}
                <div className = "flex flex-col sm:flex-row justify-end gap-3">
                    <button className = "px-4 py-2 rounded-lg bg-gray-300 w-full sm:w-auto"
                    onClick = {()=> {closeModal()}}>Cancel</button>
                    <button className ="px-4 py-2 rounded-lg bg-blue-500 text-white w-full sm:w-auto"
                    onClick = {handleSave}
                    >Save</button>
                </div>

            </div>

        </div>
    )
}

export default LectureModal
