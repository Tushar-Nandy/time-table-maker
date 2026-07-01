import { useState } from "react";

import TimeTable from "../components/Timetable";
import SetupPanel from "../components/SetupPanel";
import LectureModal from "../components/LectureModal";
import TableTabs from "../components/TableTabs";

function Home() {
    const [tables, setTables] = useState([
        {
            id: crypto.randomUUID(),
            title: "",
            timeSlots: [
                {
                    id: crypto.randomUUID(),
                    startTime: "",
                    endTime: "",
                },
            ],
            timetable: {
                Monday: {},
                Tuesday: {},
                Wednesday: {},
                Thursday: {},
                Friday: {},
                Saturday: {},
            },
        },
    ]);

    const [currentTableId, setCurrentTableId] = useState(tables[0].id);
    const [selectedCells, setSelectedCells] = useState(null);
    const [activeTab, setActiveTab] = useState("timetable");

    const currentTable = tables.find(
        (table) => table.id === currentTableId
    );

    return (
        <div className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-8">

            {/* 📱 MOBILE-FRIENDLY TAB BAR */}
            <div className="sticky top-0 z-50 bg-slate-100 pb-3">
                <div className="flex justify-center">
                    <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar p-2 bg-white rounded-xl shadow w-full max-w-md">

                        <button
                            onClick={() => setActiveTab("timetable")}
                            className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg text-sm sm:text-base transition ${
                                activeTab === "timetable"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100"
                            }`}
                        >
                            🗓 Timetable
                        </button>

                        <button
                            onClick={() => setActiveTab("marks")}
                            className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg text-sm sm:text-base transition ${
                                activeTab === "marks"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100"
                            }`}
                        >
                            📝 Marks
                        </button>

                    </div>
                </div>
            </div>

            {/* 🗓 TIMETABLE TAB */}
            {activeTab === "timetable" && (
                <div className="space-y-6">

                    <TableTabs
                        tables={tables}
                        currentTableId={currentTableId}
                        setCurrentTableId={setCurrentTableId}
                        setTables={setTables}
                    />

                    <SetupPanel
                        currentTable={currentTable}
                        setTables={setTables}
                    />

                    <TimeTable
                        currentTable={currentTable}
                        setSelectedCells={setSelectedCells}
                    />

                    <LectureModal
                        currentTable={currentTable}
                        setTables={setTables}
                        selectedCells={selectedCells}
                        setSelectedCells={setSelectedCells}
                    />

                </div>
            )}

            {/* 📝 MARKS TAB */}
            {activeTab === "marks" && (
                <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                        📝 Marks Section
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Coming soon: Student marks, tests, and report cards.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;