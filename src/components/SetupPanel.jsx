function SetupPanel({
    classTitle,
    setClassTitle,
    timeSlots,
    setTimeSlots}
) {

    const addTimeSlot = () =>{
        setTimeSlots((prevSlots) => [
            ...prevSlots,
            {
                id: crypto.randomUUID(),
                startTime: "",
                endTime: "",
            }
        ])
    }

    const removeTimeSlot = (id) => {
        if (timeSlots.length === 1){
            return;
        }
        const updatedSlots = timeSlots.filter((slot) => {
            return slot.id !== id
        })
        setTimeSlots(updatedSlots)

    }

    const updateTimeSlot = (id,field, value) => {
        const updatedSlots  = timeSlots.map((slot) => {
            if (slot.id === id){
                return {
                    ...slot,
                    [field]: value,
                }
            }
            return slot
        })
        setTimeSlots(updatedSlots)
    }

    const getTimeSlotError = (slot) =>{
        if(!slot.startTime || !slot.endTime){
            return "Both start and end times are required."
        }
        if (slot.startTime >= slot.endTime){
            return "Start time must be before end time."
        }
        return ""
    }

    return(
        <div className = "max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Setup Time Table</h2>

            <div className = "mb-6">
                <label className = "block text-lg font-medium mb-2">
                    Class Name
                </label>
                <input
                    type = "text"
                    placeholder = "Enter Class Name"
                    value = {classTitle}
                    onChange = {(e) => setClassTitle(e.target.value)}
                    className = "w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <p className= "text-gray-500"> 
                Current Class : <strong>{classTitle || "None"}</strong>
            </p>
            {/* Adding Time Slots */}
            <div className ="mt-8">
                <h3 className = "text-xl font-semibold mb-4">
                    Time Slots
                </h3>
                {timeSlots.map((slot) =>{
                    const error = getTimeSlotError(slot);

                    return(
                    <div 
                        key = {slot.id}
                        className = "flex gap-4 items-center mb-4"
                    >
                        <input
                            type = "time"
                            value = {slot.startTime}
                            className = "border rounded-lg px-3 py-2"
                            onChange = {(e) => 
                                updateTimeSlot(slot.id, "startTime", e.target.value)
                            }
                        />
                        <span>to</span>
                        <input
                            type = "time"
                            value = {slot.endTime}
                            className = "border rounded-lg px-3 py-2"
                            onChange = {(e) => 
                                updateTimeSlot(slot.id, "endTime", e.target.value)
                            }
                        />
                        {/* To check for errors */}

                        {{error} && (<p className="text-red-500 text-sm">
                            {error}
                        </p>)}

                        <button
                            onClick = {() => removeTimeSlot(slot.id)}
                            disabled = {timeSlots.length === 1}
                            className = "px-3 py-2 rounded-lg bg-red-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            🗑
                        </button>
                        
                    </div>
                );
                })}
                <button 
                    onClick = {addTimeSlot}
                    className = "bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Time Slot
                </button>
            </div>
        </div>
    )
}

export default SetupPanel