import ProjectPieChart from '@/components/ui/ProjectPieChart';
import React from 'react'
import TasksChart from '@/components/ui/TasksChart';
import Barchart from './Barchart';


export default function Analysis() {

const projects= JSON.parse(localStorage.getItem("projects")||[]);
let ActiveProjects= projects.filter((p)=> p.state==="Active");
let ONHoldProjects= projects.filter((p)=> p.state==="Hold");  
let CompletedProjects= projects.filter((p)=> p.state==="Completed");  
let NoActivePRo= ActiveProjects.length;
let NoOnhold=ONHoldProjects.length;
let NoCompletedPro=CompletedProjects.length;

let CompTasks = projects.reduce((total, p) => {
  return total + p.tasks.filter(t => t.completed).length;
}, 0);

let ToDoTasks = projects.reduce((total, p) => {
  return total + p.tasks.filter(t => !t.completed).length;
}, 0);


let ProjData = projects.map(p => {
  let name= p.name;
  let lenght=p.tasks.length;
  let Prodate={
    name:name,
    NumTaks:lenght
  }
  return Prodate;
});
const categories = ProjData.map(p => p.name);
const values = ProjData.map(p => p.NumTaks);
console.log(ProjData)

  return (
    <>
    <div className='mb-5'>
      <h1 className="text-[40px] font-bold text-gray-800 
      dark:text-white">
        Projects Analytics
      </h1>

      <p className="text-md text-gray-500 dark:text-gray-400">
        Track progress, workload, and overall performance
      </p>
      
    </div>

      <div className='ChartsContainer p-4 grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='ProjectChart'>
        <div>
            <p className="text-[30px] font-bold text-gray-800 
      dark:text-white">
        Project Overview 
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
        Breakdown of all projects by current status: active, on hold, completed</p>
        </div>
        <ProjectPieChart Active={NoActivePRo} OnHold={NoOnhold} Completed={NoCompletedPro} ></ProjectPieChart>
        </div>
        <div>
        <div>
          <p className="text-[30px] font-bold text-gray-800 dark:text-white">
  Task Progress
</p>

<p className="text-md text-gray-500 dark:text-gray-400">
  Compare completed tasks with remaining work across all projects
</p>
         </div>
          <TasksChart complted={CompTasks} todo={ToDoTasks}></TasksChart>
        </div>
       <div className="lg:col-span-2">
        <div>
  <p className="text-[30px] font-bold text-gray-800 dark:text-white">
    Projects Breakdown
  </p>

  <p className="text-md text-gray-500 dark:text-gray-400">
    Overview of tasks distribution across all projects
  </p>
</div>
        <div className="overflow-x-auto w-full">
  <div className="min-w-[600px]">
    <Barchart categories={categories} values={values} />
  </div>
</div>
       </div>
      </div>
    </>
  )
}
