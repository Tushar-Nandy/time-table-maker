import { useRef } from "react";
import {toPng, toBlob} from "html-to-image";

import subjects from "../data/subjects.js";
import teachers from "../data/teachers.js";

function TimeTable({ currentTable, setSelectedCells }) {
    const tableRef = useRef(null);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    if (!currentTable) return null;

    const formatTime = (time) => {
        if (!time) return "--:--";

        const [hours, minutes] = time.split(":");

        let hour = Number(hours);
        const period = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;
        if (hour === 0) hour = 12;

        return `${hour}:${minutes} ${period}`;
    };

    const downloadTimeTable = async () => {
    if (!tableRef.current) return;

    try {
        const dataUrl = await toPng(tableRef.current, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
        });

        const link = document.createElement("a");
        link.download = `${currentTable.title || "Timetable"}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error(err);
        alert("Failed to download timetable.");
    }
};

    const copyTimetable = async () => {
        if (!tableRef.current) return;

        const blob = await toBlob(tableRef.current, {
            cacheBust: true,
            pixelRatio: 2,
        });

        if (!blob) return;

        await navigator.clipboard.write([
            new ClipboardItem({
                "image/png": blob,
            }),
        ]);

        alert("Timetable copied!");
    };

    return (
        <div className="max-w-6xl mx-auto mt-10">

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mb-4">
                <button
                    onClick={copyTimetable}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                    📋 Copy
                </button>

                <button
                    onClick={downloadTimeTable}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    📷 Download
                </button>
            </div>

            {/* This entire card will be exported */}
            <div
                ref={tableRef}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8"
            >
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                    {currentTable.title || "Untitled Timetable"}
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border border-gray-300 border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-3 bg-gray-100">
                                    Time
                                </th>

                                {days.map((day) => (
                                    <th
                                        key={day}
                                        className="border border-gray-300 p-3 bg-gray-100"
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {currentTable.timeSlots.map((slot) => (
                                <tr key={slot.id}>
                                    <td className="border border-gray-300 p-3 font-medium">
                                        {formatTime(slot.startTime)} -{" "}
                                        {formatTime(slot.endTime)}
                                    </td>

                                    {days.map((day) => {
                                        const lecture =
                                            currentTable.timetable[day]?.[
                                                slot.id
                                            ];

                                        const subject = subjects.find(
                                            (sub) =>
                                                sub.id === lecture?.subjectId
                                        );

                                        const teacher = teachers.find(
                                            (t) =>
                                                t.id === lecture?.teacherId
                                        );

                                        return (
                                            <td
                                                key={day}
                                                className="border border-gray-300 p-2 sm:p-3 h-20 cursor-pointer hover:bg-blue-50 transition-colors text-center"
                                                style={{
                                                    backgroundColor:
                                                        subject?.color ||
                                                        "white",
                                                }}
                                                onClick={() =>
                                                    setSelectedCells({
                                                        day,
                                                        slotId: slot.id,
                                                    })
                                                }
                                            >
                                                {lecture ? (
                                                    <>
                                                        <div className="font-semibold text-sm sm:text-base">
                                                            {subject?.name}
                                                        </div>

                                                        <div className="text-xs sm:text-sm">
                                                            ({teacher?.name})
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex justify-center items-center h-full text-xl text-gray-400">
                                                        +
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TimeTable;