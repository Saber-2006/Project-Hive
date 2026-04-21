import ProjectCard from '@/components/project/ProjectCard';
import React, { useState, useEffect } from 'react'
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableCard = ({ project, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: project.id,
  });

const style = {
  transform: CSS.Translate.toString(transform),
  touchAction: "none",
  opacity: isDragging ? 0.3 : 1,
  width: "70%",
};

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ProjectCard {...project} />
    </div>
  );
};

const Column = ({ id, label, projects, activeProjectId, className }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      <p className='text-[20px] font-bold shrink-0'>{label}</p>
      <div className='flex flex-col gap-4 items-center overflow-y-auto w-full flex-1 py-2'>
        {projects.map(p => (
          <DraggableCard
            key={p.id}
            project={p}
            isDragging={activeProjectId === p.id}
          />
        ))}
      </div>
    </div>
  );
};

export default function Board() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);


  let ActiveProjects= projects.filter((p)=> p.state==="Active");
let ONHoldProjects= projects.filter((p)=> p.state==="Hold");  
let CompletedProjects= projects.filter((p)=> p.state==="Completed");  
let NoActivePRo= ActiveProjects.length;
let NoOnhold=ONHoldProjects.length;
let NoCompletedPro=CompletedProjects.length;

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const project = projects.find(p => p.id === active.id);
    setActiveProject(project);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("--- Drag End Event ---");
    console.log("Dragging Card ID:", active.id);
    console.log("Dropped Over ID:", over ? over.id : "NULL (Dropped outside)");

    setActiveProject(null);

    if (!over) return;

    const activeId = active.id;
    const overColumnId = over.id;

    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id === activeId) {
          return { ...p, state: overColumnId };
        }
        return p;
      });

      localStorage.setItem("projects", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="flex flex-col p-4 h-screen">
      <h1 className="text-[40px] font-bold text-gray-800 dark:text-white">Board</h1>

      <p className="text-md text-gray-500 dark:text-gray-400">
        Manage and track your tasks visually
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <section className='boardDivider grid grid-cols-1 md:grid-cols-3 rounded-lg mt-3 flex-1 min-h-0'>

          <Column
            id="Hold"
            label={`On Hold: ${NoOnhold}`}
            projects={projects.filter(p => p.state === "Hold")}
            activeProjectId={activeProject?.id}
            className='bg-gray-300/50 p-3 dark:bg-gray-500/50 p-1 flex flex-col items-center w-full h-full rounded-l-lg'
          />

          <Column
            id="Active"
            label={`Active: ${NoActivePRo}`}
            projects={projects.filter(p => p.state === "Active")}
            activeProjectId={activeProject?.id}
            className='bg-blue-300/50 p-3 dark:bg-blue-500/50 p-1 flex flex-col items-center w-full h-full'
          />

          <Column
            id="Completed"
            label={`Completed: ${NoCompletedPro}`}
            projects={projects.filter(p => p.state === "Completed")}
            activeProjectId={activeProject?.id}
            className='bg-green-300/50 p-3 dark:bg-green-500/50 p-1 flex flex-col items-center w-full h-full rounded-r-lg'
          />

        </section>

        <DragOverlay>
          {activeProject ? (
            <div style={{ width: "300px", opacity: 0.9 }}>
              <ProjectCard {...activeProject} />
            </div>
          ) : null}
        </DragOverlay>

      </DndContext>
    </div>
  )
}