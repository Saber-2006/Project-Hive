import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Input } from "@heroui/react";
import {Select, SelectItem} from "@heroui/react";
import {Checkbox} from "@heroui/react";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import TasksChart from "@/components/ui/TasksChart";



export default function ProjectDetails() {

const { id } = useParams();
const [project, setProject] = useState(null);
const [LocalPriorty, setLocalPriorty] = useState("high");
const [localState, setLocalState]= useState("Hold");
const [Tasks, setTasks]=useState([""]);
const [showInput, setshowInput] = useState(false);
const [TaskInput, setTaskInput] = useState("");
const [editIndex, seteditIndex] = useState(null);
const [editValue, seteditValue] = useState("");

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const foundProject = projects.find(
      (p) => String(p.id) === String(id)
    );
    setProject(foundProject);
  }, [id]);
  useEffect(() => {
  if (project?.priority) {
    setLocalPriorty(project.priority);
  }
}, [project]);

useEffect(()=>{
  if(project?.state){
    setLocalState(project.state)
  }
},[project])

useEffect(()=>{
  if(project?.tasks){
    setTasks(project.tasks)
  }
},[project])

if (!project) return <p>Project not found...</p>;

let numTasks = project?.tasks?.length || 0;

const priorityColors = {
  high: "bg-red-500/80",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

const stateColors={
    Active: "bg-purple-500",
  Hold: "bg-yellow-500",
  Completed: "bg-green-500 ",
}

function handlePriorityChange(value) {
  setLocalPriorty(value);
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const updatedProjects = projects.map((p) =>
    String(p.id) === String(id)
      ? { ...p, priority: value }
      : p
  );
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
  setProject((prev) => ({ ...prev, priority: value }));
}

function handelStateChange(value){
  setLocalState(value);
  const projects= JSON.parse(localStorage.getItem("projects"))||[];
  const updatedProjects= projects.map((p)=>
    String(p.id) === String(id)
  ?{ ...p, state: value }
  : p
  );
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
  setProject((prev) => ({ ...prev, state: value }));
}

function saveNewTask(value) {
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");
  const update = projects.map((p) => (
    String(p.id) === String(id)
      ? {
          ...p,
          tasks: [
            ...p.tasks,
            { text: value, completed: false }
          ]
        }
      : p
  ));
  localStorage.setItem("projects", JSON.stringify(update));
  setshowInput(false)
  const updatedProject = update.find(
    (p) => String(p.id) === String(id)
  );
    setProject(updatedProject);

}

function delteTask(index){
  let Newtasks= project.tasks.filter((t,i)=>i !==index);
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const UpdatePro=projects.map((p)=>(
    String(p.id)==String(id)
    ? { ...p, tasks: Newtasks }
    :p
  ))
  localStorage.setItem("projects", JSON.stringify(UpdatePro));
    const updatedProject = UpdatePro.find(
    (p) => String(p.id) === String(id)
  );

  setProject(updatedProject);
}

function handeledit(index,value){

  seteditIndex(index);
  seteditValue(value);
}
function saveEdite(index){
  const projects= JSON.parse(localStorage.getItem("projects")||"[]");
  const editedTask= project.tasks.map((t,i)=>(
    i===index
    ?{text:editValue, completed:false}
    :t
  )
  )
  const updatedProjects= projects.map((p)=>(
    String(p.id)==String(id)
    ?{...p, tasks:editedTask}
    :p
  ))
const updateProject=updatedProjects.find(
  (p)=>String(p.id)===String(id)
);
setProject(updateProject);


    seteditIndex(null);
}

let count= project.tasks.filter((t)=>
t.completed
)

let completedTAsks=count.length;
let Todo= numTasks-completedTAsks;
let percent= ((completedTAsks/numTasks)*100).toFixed(1);

function handleTaskCheck(taskIndex, isChecked){
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const updatedProjects= projects.map((p)=>{
    if(String(p.id)==String(id)){
      const updatedTasks= p.tasks.map((t,i)=>
      i=== taskIndex?{ ...t, completed: isChecked } : t
      );
      return { ...p, tasks: updatedTasks };
    }
    return p;
  })
  localStorage.setItem("projects", JSON.stringify(updatedProjects));

setProject((prev) => ({
  ...prev,
  tasks: prev.tasks.map((t, i) =>
    i === taskIndex ? { ...t, completed: isChecked } : t
  )
}));
}
function handelShow(){
setshowInput(true)
}

return (
<>
    <div className="header">
      <h1 className="text-[40px] font-bold text-gray-800 dark:text-white">
      {project.name}
  </h1>
  <p className="text-lg">
    {project.description}
  </p>
</div>

<div className="Stats grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center p-5">
      <Card  className='w-[200px] backdrop-blur-md bg-blue-500/10 border
      border-blue-400/30 rounded-2xl shadow-xl
      dark:bg-blue-500/20 dark:border-blue-400/50
      '>
      <CardBody>
        <h1 className="font-bold text-[18px] ">
          All tasks
        </h1>
        <p className=" text-2xl font-bold">{numTasks}</p>
          </CardBody>
      </Card>

          <Card  className='w-[200px] backdrop-blur-md bg-green-500/10 border
      border-green-400/30 rounded-2xl shadow-xl
      dark:bg-green-500/20 dark:border-green-400/50
      '>
      <CardBody>
        <h1 className="font-bold text-[18px] ">
          Completed
        </h1>
        <p className=" text-2xl font-bold">{completedTAsks}</p>
          </CardBody>
      </Card>
      <Card  className='w-[200px] backdrop-blur-md bg-yellow-500/10 border
      border-yellow-400/30 rounded-2xl shadow-xl
      dark:bg-yellow-500/20 dark:border-yellow-400/50
      '>
      <CardBody>
        <h1 className="font-bold text-[18px] ">
          To Do
        </h1>
        <p className=" text-2xl font-bold">{Todo}</p>
          </CardBody>
      </Card>

      <Card  className='w-[200px] backdrop-blur-md bg-purple-500/10 border
      border-purple-400/30 rounded-2xl shadow-xl
      dark:bg-purple-500/20 dark:border-purple-400/50
      '>
      <CardBody>
        <h1 className="font-bold text-[18px] ">
          percent
        </h1>
        <p className=" text-2xl font-bold">{percent} %</p>
          </CardBody>
      </Card>
</div>

<div className="flex gap-1 w-1/2 items-end">

<div className="w-full flex flex-col gap-1">
  <label htmlFor="priority" className="text-lg" >priority</label>
  <Select
  id="priority"
  className={`max-w-xs text-white ${priorityColors[LocalPriorty] || "bg-gray-500"} rounded-xl`}
  selectedKeys={[LocalPriorty]}
onSelectionChange={(keys) => {
  const value = Array.from(keys)[0];
  handlePriorityChange(value);
}}
  classNames={{
trigger: `w-full text-white rounded-lg ${priorityColors[LocalPriorty] || "bg-gray-500"} border border-gray-300 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500`,

    popoverContent:
      "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl",

    listbox: "p-1",

    listboxItem:
      "rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 data-[hover=true]:bg-green-500/20 data-[selected=true]:bg-green-500/30",
  }}
>
  <SelectItem key="high">🔴 High</SelectItem>
  <SelectItem key="medium">🟡 Medium</SelectItem>
  <SelectItem key="low">🟢 Low</SelectItem>
</Select>
</div>

<div className="w-full ">
<label htmlFor="state"  className="text-lg" >state</label>
<Select
id="state"
  className={`max-w-xs text-white  rounded-xl`}
  selectedKeys={[localState]}

onSelectionChange={(keys) => {
  const value = Array.from(keys)[0];
  handelStateChange(value);
}}
  classNames={{
    trigger:  
      `w-full text-white rounded-lg
      ${stateColors[localState]  || "bg-gray-500"} border border-gray-300 
      dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500`,

    popoverContent:
      "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl",

    listbox: "p-1",

    listboxItem:
      "rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 data-[hover=true]:bg-green-500/20 data-[selected=true]:bg-green-500/30",
  }}
>
  <SelectItem key="Active">🟣 Active</SelectItem>
  <SelectItem key="Hold">🟡 On Hold</SelectItem>
  <SelectItem key="Completed">🟢 Completed</SelectItem>
</Select>
</div> 

</div>
<section className="TasksSection m-4 
grid grid-cols-1 lg:grid-cols-2 gap-10
">
  <div>
  <p className="font-bold text-[30px]">Tasks</p>
    <div>
    { 
    project.tasks.map((task,index)=>(
        
        <ul >
        <li className="bg-gray-200 mb-2 p-2 rounded-xl 
        flex items-center justify-between
        hover:shadow-lg hover:scale-102 transition-transform duration-300
        dark:bg-gray-800/90 dark:text-white"
        key={index}>
        <div className="flex items-center gap-2">
  <Checkbox className="w-[10px]"
  onValueChange={(isChecked) => handleTaskCheck(index, isChecked)}
  >
    { editIndex != index &&
      <span className={task.completed ? "line-through opacity-50" : ""}>{task.text}</span>
    }
    {
      editIndex === index &&
    <div className=" flex items-center gap-5 justify-between">
        <Input
      className="text-black bg-white rounded-xl w-[100px]"
      onChange={(e)=>seteditValue(e.target.value)}
      placeholder="edit task"
      >
      </Input>
      <Button
      className="bg-green-500 rounded-lg text-white mt-2"
      onPress={()=>saveEdite(index)}
      >confirm
      </Button>
    </div>
    }
  </Checkbox>
</div>
<div className="flex gap-1">
        <Button
          className="w-7 h-7 rounded-lg bg-yellow-500 p-1"
        onPress={() => handeledit(index, task.text)}
        >
          <MdOutlineEdit className="text-white text-md" />
        </Button>
        <Button
          className="w-7 h-7 rounded-lg bg-red-500 p-1"
          
          onPress={()=>delteTask(index)}
        >
          <FaTrash className="text-white text-md" />
        </Button>
      </div>

        </li>
        </ul>
      )
    
    )
    }
{showInput &&
<div
  className="bg-gray-200 mb-2 p-2 rounded-xl 
      flex items-top justify-between
        hover:shadow-lg hover:scale-102 transition-transform duration-300
        dark:bg-gray-800/90 dark:text-white" 
>
  <Input 
  placeholder="new taks" 
  type="text" 
  onChange={((e)=>
  setTaskInput(e.target.value)
  )}
  />
  <Button
    className="bg-green-500 w-[100px] rounded-lg text-white mt-2"
    onPress={() => saveNewTask(TaskInput)}>
    + Add
  </Button>
</div>
}
</div>
<div>
    <Button
    onPress={handelShow}

    className="bg-blue-500 w-[100px] rounded-lg text-white mt-2"
    // onPress={addTask}
  >
    + Add Task
    </Button>
</div> 
  </div>

<div>
  <p className="font-bold text-[30px]">progress </p>
  <TasksChart complted={completedTAsks} todo={Todo}></TasksChart>
</div>
</section>
</>
);
}
