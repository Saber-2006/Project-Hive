import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Input} from "@heroui/react";
import {Chip} from "@heroui/react";
import {Button} from "@heroui/react";
import { Link } from 'react-router-dom';  
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";


export default function ProjectCard({id, name, description, priority, tasks, state }) {

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};
const stateColors={
    Active: "bg-green-500 bg-purple-500",
  Hold: "bg-yellow-500",
  Completed: "bg-green-500 ",
}

const [localTasks, setLocalTasks] = useState(tasks || []);
const [editingIndex, setEditingIndex] = useState(null);
const [editValue, setEditValue] = useState("");

function updateLocalStorage(updatedTasks) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const updatedProjects = projects.map((project) => {
    if (project.id === id) {
      return {
        ...project,
        tasks: updatedTasks,
      };
    }
    return project;
  });
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}


function deleteTask(index) {
  const updated = localTasks.filter((_, i) => i !== index);
  setLocalTasks(updated);
  updateLocalStorage(updated);
}

function startEdit(index) {
  setEditingIndex(index);
  setEditValue(localTasks[index].text);
}

function saveEdit(index) {
  
  const updated = [...localTasks];
  updated[index] = {
    ...updated[index],
    text: editValue,
  };

  setLocalTasks(updated);
  setEditingIndex(null);
  updateLocalStorage(updated);
}

function deleteProject() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const updatedProjects = projects.filter((project) => project.id !== id);
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
  window.location.reload();
}

  return (
    <>
    <Card className="w-full backdrop-blur-md bg-white/10 border 
    hover:shadow-lg hover:scale-105 transition-transform duration-300
    border-gray-400/30 rounded-2xl shadow-xl dark:bg-white/20
    dark:border-gray-400/50">
      <CardHeader className="flex justify-between items-start gap-4">
      <div className=''>
        <h3 className='font-bold text-xl'>{name}</h3>
        <p>{description}</p>
      </div>
     <div className='flex gap-1'>
       <Chip size="md"
      className={`text-white ${priorityColors[priority] || "bg-gray-500"}`}
      >
        {priority}
        </Chip>

         <Chip size="md"
      className={`text-white ${stateColors[state] || "bg-gray-500"}`}
      >
        {state}
        </Chip>
     </div>
      </CardHeader>
      <Divider />
      <CardBody>

        <p className='font-md text-xl mb-2'>Tasks</p>
<ul className="list-decimal list-inside flex flex-col gap-5">
  {(localTasks?.slice(0, 3) || []).map((task, index) => (
    <li
  key={index}
  className="flex justify-between items-center gap-2 text-lg"
>
  {editingIndex === index ? (
    <Input
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={() => saveEdit(index)} // save when click outside
      onKeyDown={(e) => {
        if (e.key === "Enter") saveEdit(index);
      }}
      autoFocus
      className="flex-1"
    />
  ) : (
    <>
      {task.text}
      <div className="flex gap-1">
        <Button
          className="w-7 h-7 rounded-lg bg-yellow-500 p-1"
          onPress={() => startEdit(index)}
        >
          <MdOutlineEdit className="text-white text-md" />
        </Button>
        <Button
          className="w-7 h-7 rounded-lg bg-red-500 p-1"
          onPress={() => deleteTask(index)}
        >
          <FaTrash className="text-white text-md" />
        </Button>
      </div>
    </>
  )}
</li>
  ))}
{tasks?.length > 3 && (
  <p className="text-sm text-gray-400">
  Open project details to see all {tasks.length} tasks
  </p>
)}
</ul>
      </CardBody>
      <Divider />
      <CardFooter className="flex gap-2">
  <Button
    as={Link}
    to={`/projectdetails/${id}`}
    radius="lg"
    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full"
  >
    View Details
  </Button>

  <Button
    radius="lg"
    className="bg-red-600 hover:bg-red-700 text-white rounded-lg w-full"
    onPress={deleteProject}
  >
    Delete
  </Button>
</CardFooter>
    </Card>
    </>
  )
}