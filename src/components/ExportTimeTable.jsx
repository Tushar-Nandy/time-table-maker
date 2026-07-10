import subjects from "../data/subjects";
import teachers from "../data/teachers";

function ExportTimeTable({ currentTable, tableRef }) {
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

    return (
        <div
            ref={tableRef}
            style={{
                position: "fixed",
                left: "0px",
                top: "0px",
                background: "white",
                padding: "24px",
                width: "1100px",
                zIndex: -9999,
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                }}
            >
                {currentTable.title || "Untitled Timetable"}
            </h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    tableLayout: "fixed",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>Time</th>

                        {days.map((day) => (
                            <th
                                key={day}
                                style={headerStyle}
                            >
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {currentTable.timeSlots.map((slot) => (
                        <tr key={slot.id}>
                            <td style={timeStyle}>
                                {formatTime(slot.startTime)} -{" "}
                                {formatTime(slot.endTime)}
                            </td>

                            {days.map((day) => {
                                const lecture =
                                    currentTable.timetable[day]?.[slot.id];

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
                                        style={{
                                            ...cellStyle,
                                            background:
                                                subject?.color || "#ffffff",
                                        }}
                                    >
                                        {lecture && (
                                            <>
                                                <div
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {subject?.name}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    ({teacher?.name})
                                                </div>
                                                {lecture?.note && (
    <div
        style={{
            fontSize: "11px",
            fontStyle: "italic",
            marginTop: "4px",
            color: "#555",
        }}
    >
        {lecture.note}
    </div>
)}
                                            </>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const headerStyle = {
    border: "1px solid #ccc",
    background: "#f3f4f6",
    padding: "10px",
    fontWeight: "bold",
};

const timeStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
};

const cellStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    height: "70px",
};

export default ExportTimeTable;
