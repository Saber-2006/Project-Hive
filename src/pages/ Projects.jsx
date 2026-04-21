import React from 'react'
import {Card, CardBody} from "@heroui/react";
import ProjectCard from '@/components/project/ProjectCard';

export default function  Projects() {

const projects = JSON.parse(localStorage.getItem("projects")) || [];
const ProjectsNumber = projects.length;

let ActiveProjects= projects.filter((p)=> p.state==="Active");
let ONHoldProjects= projects.filter((p)=> p.state==="Hold");  
let CompletedProjects= projects.filter((p)=> p.state==="Completed");  
let NoActivePRo= ActiveProjects.length;
let NoOnhold=ONHoldProjects.length;
let NoCompletedPro=CompletedProjects.length;



  return (
    <> 
<div >
  <h1 className="text-[40px] font-bold text-gray-800 dark:text-white">
    Projects
  </h1>
  <p className="text-md text-gray-500 dark:text-gray-400">
    Manage and track all your projects
  </p>
</div>
    <div className='grid  grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center p-5'>
      <Card  className='w-[200px] backdrop-blur-md bg-blue-500/10 border
       border-blue-400/30 rounded-2xl shadow-xl
       dark:bg-blue-500/20 dark:border-blue-400/50
       '>
      <CardBody>
     <h1 className="font-bold text-[18px] ">
  Number of Projects
</h1>
<p className=" text-2xl font-bold">{ProjectsNumber}</p>
      </CardBody>
      </Card>

      <Card  className='w-[200px] backdrop-blur-md
       bg-green-500/10 border border-green-400/30 rounded-3xl  shadow-xl
       dark:bg-green-500/20 dark:border-green-400/50'>
      <CardBody>
     <h1 className="font-bold text-[18px] ">
  Active 
</h1>
<p className=" text-2xl font-bold">{NoActivePRo}</p>
      </CardBody>
      </Card>

      <Card  className='w-[200px] backdrop-blur-md
       bg-yellow-500/10 border border-yellow-400/30 rounded-2xl  shadow-xl
       dark:bg-yellow-500/20 dark:border-yellow-400/50'>
      <CardBody>
     <h1 className="font-bold text-[18px] ">
  On Hold 
</h1>
<p className=" text-2xl font-bold">{NoOnhold}</p>
      </CardBody>
      </Card>
      <Card  className='w-[200px] backdrop-blur-md 
      bg-purple-500/10 border border-purple-400/30 rounded-2xl shadow-xl
      dark:bg-purple-500/20 dark:border-purple-400/50'>
      <CardBody>
      <h1 className="font-bold text-[18px] ">
      Completed 
      </h1>
<p className=" text-2xl font-bold">{NoCompletedPro}</p>
      </CardBody>
      </Card>
    </div>
    
     <div className=" grid 
     grid-cols-1
     md:grid-cols-2
     lg:grid-cols-4 gap-4
     justify-items-center mt-5">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          priority={project.priority}
          state={project.state}
             tasks={
      Array.isArray(project.tasks)
        ? project.tasks.map(t =>
            typeof t === "string"
              ? { text: t, completed: false }
              : t
          )
        : []
    }
          createdAt={project.createdAt}
        />
      ))}
    </div>
    </>
  )
}
