import React from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

const Task = ({ task}) => {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    axios.get(`http://localhost:8000/todos`).then((res) => {
      setTasks(res.data);
    });
  };
  useEffect(() => {
    getTasks();
  });

  const api = axios.create({
    baseURL: `http://localhost:8000/todos`,
  });
  const onDelete = async (id) => {
    await api.delete(`${id}`);
  };




  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`} >
      <h3>
        {task.description}
        <FaTimes
          style={{
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => onDelete(task._id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
