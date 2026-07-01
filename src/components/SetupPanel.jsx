function SetupPanel({
    currentTable,
    setTables,
}) {
    if (!currentTable) {
        return null;
    }

    const updateCurrentTable = (updatedTable) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === currentTable.id
                    ? updatedTable
                    : table
            )
        );
    };

    const addTimeSlot = () => {
        updateCurrentTable({
            ...currentTable,
            timeSlots: [
                ...currentTable.timeSlots,
                {
                    id: crypto.randomUUID(),
                    startTime: "",
                    endTime: "",
                },
            ],
        });
    };

    const removeTimeSlot = (id) => {
        if (currentTable.timeSlots.length === 1) {
            return;
        }

        updateCurrentTable({
            ...currentTable,
            timeSlots: currentTable.timeSlots.filter(
                (slot) => slot.id !== id
            ),
        });
    };

    const updateTimeSlot = (id, field, value) => {
        updateCurrentTable({
            ...currentTable,
            timeSlots: currentTable.timeSlots.map((slot) =>
                slot.id === id
                    ? {
                          ...slot,
                          [field]: value,
                      }
                    : slot
            ),
        });
    };

    const getTimeSlotError = (slot) => {
        if (!slot.startTime || !slot.endTime) {
            return "Both start and end times are required.";
        }

        if (slot.startTime >= slot.endTime) {
            return "Start time must be before end time.";
        }

        return "";
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-6">
                Timetable Settings
            </h2>

            <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                    Timetable Name
                </label>

                <input
                    type="text"
                    placeholder="Enter Timetable Name"
                    value={currentTable.title}
                    onChange={(e) =>
                        updateCurrentTable({
                            ...currentTable,
                            title: e.target.value,
                        })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <p className="text-gray-500">
                Current Timetable :{" "}
                <strong>{currentTable.title || "None"}</strong>
            </p>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                    Time Slots
                </h3>

                {currentTable.timeSlots.map((slot) => {
                    const error = getTimeSlotError(slot);

                    return (
                        <div
                            key={slot.id}
                            className="mb-4"
                        >
                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                <input
                                    type="time"
                                    value={slot.startTime}
                                    className="border rounded-lg px-3 py-2"
                                    onChange={(e) =>
                                        updateTimeSlot(
                                            slot.id,
                                            "startTime",
                                            e.target.value
                                        )
                                    }
                                />

                                <span>to</span>

                                <input
                                    type="time"
                                    value={slot.endTime}
                                    className="border rounded-lg px-3 py-2"
                                    onChange={(e) =>
                                        updateTimeSlot(
                                            slot.id,
                                            "endTime",
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    onClick={() =>
                                        removeTimeSlot(slot.id)
                                    }
                                    disabled={
                                        currentTable.timeSlots.length === 1
                                    }
                                    className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    🗑
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error}
                                </p>
                            )}
                        </div>
                    );
                })}

                <button
                    onClick={addTimeSlot}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
                >
                    + Add Time Slot
                </button>
            </div>
        </div>
    );
}

export default SetupPanel;