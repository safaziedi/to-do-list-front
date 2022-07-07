import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import axios from "axios";



function App() {

  const name = "Safa";
  const [showForm, setShowForm] = useState(true);
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    axios.get(`http://localhost:8000/todos`)
    .then(res => {setTasks(res.data) 
    })
  }
  useEffect( ()=>{
    getTasks()
    
  })


  const addTask = async (task) => {
    axios.post(
      'http://localhost:8000/todos',
    {
      description: task.description,
      day : task.day,
      reminder: task.reminder
    }
    )
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
    <Router>
      
      <div>
      
      
          <h2 style={{ descriptionAlign: "center" }}>Hello {name}</h2>
          
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
            {showForm && <AddTask onAdd={addTask } />}
           
            {tasks.length > 0 ? (
              <Tasks
                tasks={
                  tasks
                } 
              />

            ) : (
              "Votre ToDoList est vide"
            )}


            <Footer />
          </div>
          </div>
        </div>
        
    </Router>
    </div>
  );
}

export default App;
