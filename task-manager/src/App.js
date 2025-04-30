import React, { useEffect, useState } from "react";
import {
  getCompletedTasks,
  getUpcomingTasks,
  createTask,
} from "./services/api";
import Task from "./components/Task";
import "./App.css";

function App() {
  let [tasks, setTasks] = useState([]); // upcoming tasks
  let [completedTasks, setCompletedTasks] = useState([]); // completed tasks

  const [taskName, setTaskName] = useState("");

  async function fetchTasks() {
    const upcoming = await getUpcomingTasks();
    setTasks(upcoming);
    const complete = await getCompletedTasks();
    setCompletedTasks(complete);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let newTask = await createTask(taskName);
      console.log("New task created:", newTask);
      fetchTasks(); // refresh todo list
    } catch (error) {
      console.error("Error creating task:", error);
    }
    setTaskName(""); // clear the input field
  };

  return (
    <div className="list-container">
      <form onSubmit={handleSubmit} id="create-task-form">
        <input
          type="text"
          id="task-name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder='e.g., "Buy groceries"'
        ></input>
        <label htmlFor="task-name"></label>
        <input type="submit" value="Create New Task"></input>
      </form>
      <h1>Upcoming Tasks</h1>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              taskId={task.id}
              name={task.name}
              done={task.done}
              refreshTasks={fetchTasks}
            ></Task>
          ))
        ) : (
          <p>No upcoming tasks! Create a new one above.</p>
        )}
      </div>

      <h1>Completed Tasks</h1>
      <div className="task-list">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Task
              key={task.id}
              taskId={task.id}
              name={task.name}
              done={task.done}
              refreshTasks={fetchTasks}
            ></Task>
          ))
        ) : (
          <p>Completed tasks will be shown here!</p>
        )}
      </div>
    </div>
  );
}

export default App;
