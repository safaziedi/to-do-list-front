import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const name = "Safa";
  const [showForm, setShowForm] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const tasktotoggle = await fetchTask(id);
    const updatedtask = { ...tasktotoggle, reminder: !tasktotoggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedtask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              reminder: data.reminder,
            }
          : task
      )
    );
  };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    /*const id= Math.floor(Math.random()*123)+1
    const newTask={id,...task}
    setTasks([...tasks, newTask])*/
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
    <Router>
      
      <div>
      
      
          <h2 style={{ textAlign: "center" }}>Hello {name}</h2>
          
        <div className="container">

            <div className="container1">
            <span style={{ color: darkMode ? "grey" : "yellow"}}>☀︎</span>
            <span className="switch-checkbox" >
              <label className="switch" >
                <input
                  type="checkbox"
                  onChange={() => setDarkMode(!darkMode)}   
                />
                <span className="slider round"  > </span>
              </label>
            </span>

            <span style={{ color: darkMode ? "#c96dfd" : "grey"}} >☽</span>
            <Header
              title="to Do List"
              onClickAdd={() => setShowForm(!showForm)}
              show={showForm}
            />
            {showForm && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            ) : (
              "Votre ToDoList est vide"
            )}

            <Routes>
              <Route path="/about" exact element={<About />} />
            </Routes>

            <Footer />
          </div>
          </div>
        </div>
        
    </Router>
    </div>
  );
}

export default App;
