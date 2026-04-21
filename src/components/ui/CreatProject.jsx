import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import {Select, SelectItem} from "@heroui/react";
import { IoIosAddCircleOutline } from 'react-icons/io';
import  { useState } from 'react';

export default function CreatProject() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
const [tasks, setTasks] = useState([""]);
const [projectName, setProjectName] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("high");
const [state, setState] = useState("high");
const [errors, setErrors] = useState({});




const addTask = () => {
  setTasks([...tasks, ""]);
};

const handleTaskChange = (value, index) => {
  const updated = [...tasks];
  updated[index] = value;
  setTasks(updated);
};

const removeTask = (index) => {
  setTasks(tasks.filter((_, i) => i !== index));
};

const validate = () => {
  const newErrors = {};

  if (!projectName.trim()) {
    newErrors.projectName = "Project name is required";
  }

  if (!description.trim()) {
    newErrors.description = "Description is required";
  }

  if (tasks.length === 0) {
    newErrors.tasks = "At least one task is required";
  }

  if (tasks.some((t) => !t.trim())) {
    newErrors.tasks = "Task cannot be empty";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



const handleCreateProject = () => {

  const formattedTasks =
  tasks
    .filter(t => t.trim() !== "")
    .map(e => ({
      text: e,
      completed: false
    }));
  if (!validate()) return;
  const newProject = {
  id: crypto.randomUUID(),// unique id
    name: projectName,
    description,
    priority,
    state,
    tasks:formattedTasks,
    createdAt: new Date().toISOString(),
  };
  saveToLocalStorage(newProject);
  setProjectName("");
  setDescription("");
  setPriority("high");
  setState("On Hold")
  setTasks([""]);
  window.location.reload();
};
const saveToLocalStorage = (project) => {
  const existing = localStorage.getItem("projects");

  const projects = existing ? JSON.parse(existing) : [];

  projects.push(project);

  localStorage.setItem("projects", JSON.stringify(projects));
};

  return (
    <>
        <Button onPress={onOpen} className='bg-green-600 rounded-xl text-white font-bold p-2' radius='sm'>
          <IoIosAddCircleOutline size={20} className='font-bold' />
          <p>New Project</p>
        </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" 
      className='bg-gray-200 
      rounded-lg p-6 shadow-lg 
      border border-gray-300/50 
      dark:border-gray-700/50 
      dark:bg-gray-800/90 backdrop-blur-md
      h-[500px]
      w-full
      m-auto overflow-y-auto'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader 
              className="flex flex-col gap-1 mx-auto font-bold text-xl ">
                Creat New Project
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Project Name  
                    </label>
                    <Input
                      type="text"
                      className="w-full  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter project name"
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    {errors.projectName && (
  <p className="text-red-500 text-sm">{errors.projectName}</p>
)}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <Input
                      className="w-full  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter project description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
  <p className="text-red-500 text-sm">{errors.description}</p>
)}
                  </div>

 <div className="flex flex-col gap-1 w-full">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
    Priority
  </label>

  <Select
    isRequired
    defaultSelectedKeys={["high"]}
    placeholder="Select priority"
    onSelectionChange={(keys) => {
    const value = Array.from(keys)[0];
    setPriority(value);
  }}
    classNames={{
      trigger:
        "w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-green-500",

      // dropdown container
      popoverContent:
        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl",

      // list wrapper
      listbox: "p-1",

      // each item
      listboxItem:
        "rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 data-[hover=true]:bg-green-500/20 data-[selectable=true]:focus:bg-green-500/30 data-[selected=true]:bg-green-500/30",
    }}
  >
    <SelectItem key="high">🔴 High</SelectItem>
    <SelectItem key="medium">🟡 Medium</SelectItem>
    <SelectItem key="low">🟢 Low</SelectItem>
  </Select>
</div>
 <div className="flex flex-col gap-1 w-full">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
    state
  </label>
  <Select
    isRequired
    defaultSelectedKeys={["On Hold"]}
    placeholder="Select statuse"
      onSelectionChange={(keys) => {
    const value = Array.from(keys)[0];
  setState(value);
  }}
    classNames={{
      trigger:
        "w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-green-500",

      // dropdown container
      popoverContent:
        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl",

      // list wrapper
      listbox: "p-1",

      // each item
      listboxItem:
        "rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 data-[hover=true]:bg-green-500/20 data-[selectable=true]:focus:bg-green-500/30 data-[selected=true]:bg-green-500/30",
    }}
  >
    <SelectItem key="Active">🟢 Active</SelectItem>
    <SelectItem key="Hold">🟡 On Hold</SelectItem>
    <SelectItem key="Completed">🟣 Completed</SelectItem>
  </Select>
</div>
                <div>
                <div className="flex flex-col gap-2">
<div className='flex p-2 justify-between items-center'>
  <label className="text-md font-bold text-gray-700 dark:text-gray-300">
    Tasks
  </label>
    <Button
    size="sm"
    className="bg-blue-500 w-[100px] rounded-lg text-white mt-2"
    onPress={addTask}
  >
    + Add Task
      </Button>

</div>
  {tasks.map((task, index) => (
    <div key={index} className="flex gap-2 items-center">
      <Input
        value={task}
        onChange={(e) => handleTaskChange(e.target.value, index)}
        placeholder={`Task ${index + 1}`}
        className="flex-1"
      />
      {tasks.length > 1 && (
        <Button
          size="sm"
          color="danger"
          variant="light"
          onPress={() => removeTask(index)}
        >
          ✕
        </Button>
      )}
     
    </div>
  ))}  
   {errors.tasks && (
  <p className="text-red-500 text-sm">{errors.tasks}</p>
)}  
                </div>
                </div>

                </form> 
              </ModalBody>
              <ModalFooter>
                <Button  className='text-red-500 rounded-lg hover:bg-red-500/50' variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                 className='bg-green-600 rounded-lg hover:bg-green-700 text-white'
                  onPress={() => {
  const isValid = validate();
  if (isValid) {
    handleCreateProject();
    onClose();
  }
}}
                  >
                  Creat
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}



