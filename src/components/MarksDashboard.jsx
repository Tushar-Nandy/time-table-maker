import {useState, useRef} from "react";
import { toPng, toBlob } from "html-to-image";

import students from "../data/students"

function MarksDashboard() {
    const tableRef = useRef(null);
    const classList = Object.keys(students)
    const [selectedClass, setSelectedClass] = useState(classList[0]);
    const [isExporting, setIsExporting] = useState(false);

    const [testInfo, setTestInfo] = useState({
        subject: "",
        chapter: "",
        totalMarks: "",
    })

    const [marks, setMarks] = useState({
        "8th CBSE": {},
        "9th CBSE": {},
    });

    const handleMarksChange = (studentName, value) => {
        setMarks((prev)=>({
            ...prev,
            [selectedClass]:{
                ...prev[selectedClass],
                [studentName]: value
            }
        }))
    }

    const downloadMarks = async() => {
        if(!tableRef.current){
            return
        }

        try{
            setIsExporting(true);

            await new Promise((resolve)=> setTimeout(resolve, 100));
            const dataUrl = await toPng(tableRef.current,{
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: "white"
            })
            const link = document.createElement("a")
            link.download = `${selectedClass}_marks_report.png`
            link.href = dataUrl
            link.click()
        }catch(error){
            console.error("Error occurred while exporting marks:", error);
        }finally{
            setIsExporting(false);
        }
    }

    const copyMarks = async() =>{
        if(!tableRef.current){
            return
        }
        try{
            setIsExporting(true);

            await new Promise((resolve) => setTimeout(resolve, 100));

            const blob = await toBlob(tableRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: "white"
            })
            if(!blob){
                return
            }
            await navigator.clipboard.write([
                new ClipboardItem({
                    "image/png": blob
                })
            ])
            alert("Marks table copied to clipboard!")
        }finally{
            setIsExporting(false);
        }
    }

    const currentStudents = students[selectedClass] || [];

    return(
        <div className = "max-w-5xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow">

            <div className="flex flex-wrap gap-3 mb-6">
                {classList.map((cls) =>(
                    <button
                        key= {cls}
                        onClick={()=> setSelectedClass(cls)}
                        className = {`px-4 py-2 rounded-lg text-sm sm:text-base transition ${
                            selectedClass === cls? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            <div className = "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <input
                    type = "text"
                    placeholder = "Subject"
                    value = {testInfo.subject}
                    onChange = {(e)=> setTestInfo({
                        ...testInfo,
                        subject: e.target.value
                    })}
                    className = "border p-2 rounded-lg"
                />
                <input
                    type = "text"
                    placeholder = "Chapter"
                    value = {testInfo.chapter}
                    onChange = {(e)=> setTestInfo({
                        ...testInfo,
                        chapter: e.target.value
                    })}
                    className = "border p-2 rounded-lg"
                />
                <input
                    type = "number"
                    placeholder = "Total Marks"
                    value = {testInfo.totalMarks}
                    onChange = {(e)=> setTestInfo({
                        ...testInfo,
                        totalMarks: e.target.value
                    })}
                    className = "border p-2 rounded-lg"
                />
            </div>
            <div>
                <button
                    onClick = {copyMarks}
                    className = "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                    📋 Copy
                </button>
                <button
                    onClick = {downloadMarks}
                    className = "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ml-2"
                >
                    📷 Download
                </button>
            </div>

            {/* Marks Table */}
            <div className = "bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg" ref = {tableRef}>
                <h2 className = "text-xl sm:text-2xl font-bold mb-4 text-center">
                    {selectedClass} - Test Report
                </h2>
                <div className = "mb-6 text-center space-y-1">
                    <p className = "text-gray-700">
                        Subject: {testInfo.subject || "N/A"}
                    </p>
                    <p className = "text-gray-700">
                        Chapter: {testInfo.chapter || "N/A"}
                    </p>
                    <p className = "text-gray-700">
                        Total Marks: {testInfo.totalMarks || "N/A"}
                    </p>
                </div>
                <div className = "overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className = "bg-gray-100">
                            <th className = "p-3 border text-left">
                                Student Name
                            </th>
                            <th className = "p-3 border text-left">
                                Marks
                            </th>
                            {!isExporting && (
                                <th>Absent</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentStudents.map((student)=>{
                                const isAbsent = marks?.[selectedClass]?.[student] === "AB";
                                return(
                                    <tr className = {`hover:bg-gray-50 ${isAbsent ? "bg-red-50" : ""}`} 
                                    key = {student}
                                    >
                                        <td className = "p-3 border font-medium">
                                            {student}
                                        </td>

                                        <td>
                                            {isExporting ? (
                                                <div>
                                                    {isAbsent ? "AB": marks?.[selectedClass]?.[student] ?? ""}
                                                </div>
                                            ):(
                                                <input 
                                                    type = "number"
                                                    placeholder = "Enter marks"
                                                    disabled = {isAbsent}
                                                    value = {isAbsent ? "" : marks?.[selectedClass]?.[student] ?? ""}
                                                    onChange = {(e) => handleMarksChange(student, e.target.value)}
                                                    className ={ `w-full border p-2 rounded-lg ${isAbsent ? "bg-gray-100 cursor-not-allowed" : "" }`}
                                                />
                                            )}
                                        </td>
                                        
                                        {!isExporting && (
                                            <td className="p-3 border text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isAbsent}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            handleMarksChange(student, "AB");
                                                        } else {
                                                            handleMarksChange(student, "");
                                                        }
                                                    }}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>

        </div>
    )
}

export default MarksDashboard;