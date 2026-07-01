function TableTabs({
    tables,
    currentTableId,
    setCurrentTableId,
    setTables,
}){
    const addTable = () =>{
        const newTable = {
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

        setTables((prev) => [...prev, newTable])
        setCurrentTableId(newTable.id)
    }

    return(
        <div className = "max-w-6xl mx-auto mb-6 flex gap-3 flex-wrap items-center">
            {tables.map((table) => (
                <button
                    key = {table.id}
                    onClick = {() => setCurrentTableId(table.id)}
                    className = {`px-4 py-2 rounded-lg transition ${
                        currentTableId === table.id ? "bg-blue-600 text-white": "bg-white border hover:bg-gray-100"
                    }`}
                >
                    {table.title || "Untitled"}
                </button>
            ))}
            <button
                onClick = {addTable}
                className = "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
                + New
            </button>
        </div>
    )
}

export default TableTabs