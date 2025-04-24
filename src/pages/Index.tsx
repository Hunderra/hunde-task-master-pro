import React, { useState } from "react";
import { Project } from "@/types/project";
import { initialData } from "@/data/initial-data";
import { ProjectCard } from "@/components/ProjectCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [data, setData] = useState<Project[]>(initialData);
  const [newProject, setNewProject] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [projectForNewTodo, setProjectForNewTodo] = useState("");
  const [subProjectForNewTodo, setSubProjectForNewTodo] = useState("");
  const [exportFormat, setExportFormat] = useState("markdown");
  const [editingItem, setEditingItem] = useState({
    projectIndex: -1,
    subProjectIndex: -1,
    type: "",
    itemIndex: -1,
    value: "",
  });
  const [newSubProject, setNewSubProject] = useState("");
  const [projectForNewSubProject, setProjectForNewSubProject] = useState("");
  const [showAllTodos, setShowAllTodos] = useState(false);

  const { toast } = useToast();

  const addProject = () => {
    if (newProject.trim()) {
      setData([
        ...data,
        { project: newProject, todo: [], done: [], subProjects: [] },
      ]);
      setNewProject("");
      toast({
        title: "Project added",
        description: `Project "${newProject}" has been created successfully.`,
      });
    }
  };

  const addSubProject = () => {
    if (newSubProject.trim() && projectForNewSubProject) {
      const updatedData = [...data];
      const projectIndex = updatedData.findIndex(
        (p) => p.project === projectForNewSubProject
      );
      if (projectIndex !== -1) {
        updatedData[projectIndex].subProjects.push({
          name: newSubProject,
          todo: [],
          done: [],
        });
        setData(updatedData);
        setNewSubProject("");
        toast({
          title: "Sub-project added",
          description: `Sub-project "${newSubProject}" has been added to "${projectForNewSubProject}".`,
        });
      }
    }
  };

  const addTodo = () => {
    if (newTodo.trim() && projectForNewTodo) {
      const updatedData = [...data];
      const projectIndex = updatedData.findIndex(
        (p) => p.project === projectForNewTodo
      );
      
      if (projectIndex !== -1) {
        if (subProjectForNewTodo) {
          const subProjectIndex = updatedData[projectIndex].subProjects.findIndex(
            (sp) => sp.name === subProjectForNewTodo
          );
          if (subProjectIndex !== -1) {
            updatedData[projectIndex].subProjects[subProjectIndex].todo.push(
              newTodo
            );
          }
        } else {
          updatedData[projectIndex].todo.push(newTodo);
        }
        
        setData(updatedData);
        setNewTodo("");
        toast({
          title: "Task added",
          description: "New task has been added successfully.",
        });
      }
    }
  };

  const markAsDone = (projectIndex: number, todoIndex: number, subProjectIndex = -1) => {
    const updatedData = [...data];
    
    if (subProjectIndex === -1) {
      const item = updatedData[projectIndex].todo[todoIndex];
      updatedData[projectIndex].done.push(item);
      updatedData[projectIndex].todo.splice(todoIndex, 1);
    } else {
      const item = updatedData[projectIndex].subProjects[subProjectIndex].todo[todoIndex];
      updatedData[projectIndex].subProjects[subProjectIndex].done.push(item);
      updatedData[projectIndex].subProjects[subProjectIndex].todo.splice(todoIndex, 1);
    }
    
    setData(updatedData);
    toast({
      title: "Task completed",
      description: "Task has been marked as done.",
    });
  };

  const markAsTodo = (projectIndex: number, doneIndex: number, subProjectIndex = -1) => {
    const updatedData = [...data];
    
    if (subProjectIndex === -1) {
      const item = updatedData[projectIndex].done[doneIndex];
      updatedData[projectIndex].todo.push(item);
      updatedData[projectIndex].done.splice(doneIndex, 1);
    } else {
      const item = updatedData[projectIndex].subProjects[subProjectIndex].done[doneIndex];
      updatedData[projectIndex].subProjects[subProjectIndex].todo.push(item);
      updatedData[projectIndex].subProjects[subProjectIndex].done.splice(doneIndex, 1);
    }
    
    setData(updatedData);
    toast({
      title: "Task reopened",
      description: "Task has been moved back to to-do.",
    });
  };

  const deleteTodo = (projectIndex: number, todoIndex: number, subProjectIndex = -1) => {
    const updatedData = [...data];
    
    if (subProjectIndex === -1) {
      updatedData[projectIndex].todo.splice(todoIndex, 1);
    } else {
      updatedData[projectIndex].subProjects[subProjectIndex].todo.splice(todoIndex, 1);
    }
    
    setData(updatedData);
    toast({
      title: "Task deleted",
      description: "Task has been removed.",
      variant: "destructive",
    });
  };

  const deleteDone = (projectIndex: number, doneIndex: number, subProjectIndex = -1) => {
    const updatedData = [...data];
    
    if (subProjectIndex === -1) {
      updatedData[projectIndex].done.splice(doneIndex, 1);
    } else {
      updatedData[projectIndex].subProjects[subProjectIndex].done.splice(doneIndex, 1);
    }
    
    setData(updatedData);
    toast({
      title: "Completed task deleted",
      description: "Completed task has been removed.",
      variant: "destructive",
    });
  };

  const deleteProject = (projectIndex: number) => {
    const updatedData = [...data];
    const projectName = updatedData[projectIndex].project;
    updatedData.splice(projectIndex, 1);
    setData(updatedData);
    toast({
      title: "Project deleted",
      description: `Project "${projectName}" has been deleted.`,
      variant: "destructive",
    });
  };

  const deleteSubProject = (projectIndex: number, subProjectIndex: number) => {
    const updatedData = [...data];
    const subProjectName = updatedData[projectIndex].subProjects[subProjectIndex].name;
    updatedData[projectIndex].subProjects.splice(subProjectIndex, 1);
    setData(updatedData);
    toast({
      title: "Sub-project deleted",
      description: `Sub-project "${subProjectName}" has been deleted.`,
      variant: "destructive",
    });
  };

  const startEditing = (
    projectIndex: number,
    type: string,
    itemIndex: number,
    value: string,
    subProjectIndex = -1
  ) => {
    setEditingItem({ projectIndex, subProjectIndex, type, itemIndex, value });
  };

  const saveEdit = () => {
    if (editingItem.projectIndex !== -1 && editingItem.value.trim()) {
      const updatedData = [...data];
      
      if (editingItem.subProjectIndex === -1) {
        updatedData[editingItem.projectIndex][editingItem.type][editingItem.itemIndex] = editingItem.value;
      } else {
        updatedData[editingItem.projectIndex].subProjects[editingItem.subProjectIndex][editingItem.type][editingItem.itemIndex] = editingItem.value;
      }
      
      setData(updatedData);
      setEditingItem({ projectIndex: -1, subProjectIndex: -1, type: "", itemIndex: -1, value: "" });
      toast({
        title: "Task updated",
        description: "Task has been edited successfully.",
      });
    }
  };

  const exportData = () => {
    let exportContent = "";
    
    if (exportFormat === "markdown") {
      exportContent = "| Projekti/yritys | To-do | Done |\n| :---- | :---- | :---- |\n";
      data.forEach((project) => {
        let todoContent = project.todo.join("<br>");
        let doneContent = project.done.join("<br>");
        
        project.subProjects.forEach((subProject) => {
          if (subProject.todo.length > 0) {
            todoContent += (todoContent ? "<br>" : "") + `**${subProject.name}** ${subProject.todo.join(", ")}`;
          }
          if (subProject.done.length > 0) {
            doneContent += (doneContent ? "<br>" : "") + `**${subProject.name}** ${subProject.done.join(", ")}`;
          }
        });
        
        exportContent += `| **${project.project}** | ${todoContent} | ${doneContent} |\n`;
      });
    } else if (exportFormat === "csv") {
      exportContent = "Projekti/yritys,To-do,Done\n";
      data.forEach((project) => {
        let todoContent = project.todo.join("; ");
        let doneContent = project.done.join("; ");
        
        project.subProjects.forEach((subProject) => {
          if (subProject.todo.length > 0) {
            todoContent += (todoContent ? "; " : "") + `${subProject.name}: ${subProject.todo.join(", ")}`;
          }
          if (subProject.done.length > 0) {
            doneContent += (doneContent ? "; " : "") + `${subProject.name}: ${subProject.done.join(", ")}`;
          }
        });
        
        exportContent += `"${project.project}","${todoContent}","${doneContent}"\n`;
      });
    } else if (exportFormat === "json") {
      exportContent = JSON.stringify(data, null, 2);
    }
    
    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hunde-todo-list.${exportFormat === "markdown" ? "md" : exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: `Project data has been exported in ${exportFormat.toUpperCase()} format.`,
    });
  };

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          Hunde's Project Tracker
        </h1>
        <p className="text-gray-600">Manage your projects and tasks efficiently</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Add New Project</h2>
          <div className="flex gap-2">
            <Input
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="Project name"
              onKeyPress={(e) => e.key === "Enter" && addProject()}
            />
            <Button onClick={addProject}>Add</Button>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Add New Sub-Project</h2>
          <div className="space-y-2">
            <Select value={projectForNewSubProject} onValueChange={setProjectForNewSubProject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Parent Project" />
              </SelectTrigger>
              <SelectContent>
                {data.map((project) => (
                  <SelectItem key={project.project} value={project.project}>
                    {project.project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                value={newSubProject}
                onChange={(e) => setNewSubProject(e.target.value)}
                placeholder="Sub-project name"
                onKeyPress={(e) => e.key === "Enter" && addSubProject()}
              />
              <Button onClick={addSubProject}>Add</Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Add New Task</h2>
          <div className="space-y-2">
            <Select value={projectForNewTodo} onValueChange={(value) => {
              setProjectForNewTodo(value);
              setSubProjectForNewTodo("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {data.map((project) => (
                  <SelectItem key={project.project} value={project.project}>
                    {project.project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {projectForNewTodo && data.find((p) => p.project === projectForNewTodo)?.subProjects.length > 0 && (
              <Select value={subProjectForNewTodo} onValueChange={setSubProjectForNewTodo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sub-Project (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Main Project</SelectItem>
                  {data
                    .find((p) => p.project === projectForNewTodo)
                    ?.subProjects.map((subProject) => (
                      <SelectItem key={subProject.name} value={subProject.name}>
                        {subProject.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}

            <div className="flex gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo}>Add</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowAllTodos(!showAllTodos)}
          className="w-full max-w-md"
        >
          {showAllTodos ? "Hide" : "Show"} All Open Tasks (
          {data.reduce(
            (count, project) =>
              count +
              project.todo.length +
              project.subProjects.reduce(
                (subCount, sub) => subCount + sub.todo.length,
                0
              ),
            0
          )}
          )
        </Button>
      </div>

      {showAllTodos && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Open Tasks</h2>
          <div className="space-y-4">
            {data.map((project, projectIndex) => (
              <React.Fragment key={`all-todos-${projectIndex}`}>
                {(project.todo.length > 0 ||
                  project.subProjects.some((sub) => sub.todo.length > 0)) && (
                  <div className="border-b pb-4">
                    <h3 className="font-medium text-lg text-blue-700 mb-2">
                      {project.project}
                    </h3>
                    <ul className="space-y-2 ml-4">
                      {project.todo.map((item, todoIndex) => (
                        <li
                          key={`main-${todoIndex}`}
                          className="flex items-center justify-between group"
                        >
                          <span>{item}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsDone(projectIndex, todoIndex)}
                            className="opacity-0 group-hover:opacity-100"
                          >
                            Complete
                          </Button>
                        </li>
                      ))}
                      {project.subProjects.map(
                        (subProject, subProjectIndex) =>
                          subProject.todo.length > 0 && (
                            <div key={`sub-${subProjectIndex}`} className="ml-4">
                              <h4 className="font-medium text-blue-600 mb-1">
                                {subProject.name}
                              </h4>
                              <ul className="space-y-2">
                                {subProject.todo.map((item, todoIndex) => (
                                  <li
                                    key={`sub-todo-${todoIndex}`}
                                    className="flex items-center justify-between group"
                                  >
                                    <span>{item}</span>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        markAsDone(
                                          projectIndex,
                                          todoIndex,
                                          subProjectIndex
                                        )
                                      }
                                      className="opacity-0 group-hover:opacity-100"
                                    >
                                      Complete
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                      )}
                    </ul>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-6">
        {data.map((project, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            project={project}
            projectIndex={projectIndex}
            editingItem={editingItem}
            onEdit={startEditing}
            onSaveEdit={saveEdit}
            onUpdateEditValue={(value) =>
              setEditingItem({ ...editingItem, value })
            }
            onMarkDone={markAsDone}
            onMarkTodo={markAsTodo}
            onDeleteTodo={deleteTodo}
            onDeleteDone={deleteDone}
            onDeleteProject={deleteProject}
            onDeleteSubProject={deleteSubProject}
          />
        ))}
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Export Data</h2>
        <div className="flex gap-2">
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData} variant="outline">
            Export
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;
