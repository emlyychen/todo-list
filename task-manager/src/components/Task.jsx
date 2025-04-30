// import { useState } from "react";
import { completeTask, deleteTask } from "../services/api";
import "../css/task.css";

export default function Task({ name, taskId, done, refreshTasks }) {
    const handleDelete = async () => {
        try {
            await deleteTask(taskId);
        } catch (error) {
            console.error("Error creating task:", error);
        }
        refreshTasks();
    };

    const handleComplete = async () => {
        try {
            await completeTask(taskId);
            console.log("completed");
        } catch (error) {
            console.error("Error creating task:", error);
        }
        refreshTasks();
    };

    return (
        <div className="task-container">
            <h2>{name}</h2>
            {!done && (
                <>
                    <label htmlFor="task-complete"> Task complete?</label>
                    <input
                        type="checkbox"
                        id="task-complete"
                        onChange={handleComplete}
                    ></input>
                </>
            )}
            <button onClick={handleDelete}> Delete task</button>
        </div>
    );
}
