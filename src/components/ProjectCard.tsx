
import { type Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { Check, ArrowUp, Trash2, Edit } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  projectIndex: number;
  editingItem: {
    projectIndex: number;
    subProjectIndex: number;
    type: string;
    itemIndex: number;
    value: string;
  };
  onEdit: (projectIndex: number, type: string, itemIndex: number, value: string, subProjectIndex?: number) => void;
  onSaveEdit: () => void;
  onUpdateEditValue: (value: string) => void;
  onMarkDone: (projectIndex: number, todoIndex: number, subProjectIndex?: number) => void;
  onMarkTodo: (projectIndex: number, doneIndex: number, subProjectIndex?: number) => void;
  onDeleteTodo: (projectIndex: number, todoIndex: number, subProjectIndex?: number) => void;
  onDeleteDone: (projectIndex: number, doneIndex: number, subProjectIndex?: number) => void;
  onDeleteProject: (projectIndex: number) => void;
  onDeleteSubProject: (projectIndex: number, subProjectIndex: number) => void;
}

export const ProjectCard = ({
  project,
  projectIndex,
  editingItem,
  onEdit,
  onSaveEdit,
  onUpdateEditValue,
  onMarkDone,
  onMarkTodo,
  onDeleteTodo,
  onDeleteDone,
  onDeleteProject,
  onDeleteSubProject,
}: ProjectCardProps) => {
  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSaveEdit();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-blue-700">{project.project}</CardTitle>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteProject(projectIndex)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Todo Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 border-b pb-2">To-Do</h3>
            {project.todo.length === 0 ? (
              <EmptyState message="No tasks yet" />
            ) : (
              <ul className="space-y-2">
                {project.todo.map((item, todoIndex) => (
                  <li key={todoIndex} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group border">
                    {editingItem.projectIndex === projectIndex &&
                    editingItem.type === "todo" &&
                    editingItem.itemIndex === todoIndex &&
                    editingItem.subProjectIndex === -1 ? (
                      <input
                        type="text"
                        value={editingItem.value}
                        onChange={(e) => onUpdateEditValue(e.target.value)}
                        onBlur={onSaveEdit}
                        onKeyPress={handleEditKeyPress}
                        autoFocus
                        className="flex-1 p-2 rounded-md border"
                      />
                    ) : (
                      <span 
                        className="flex-1 cursor-pointer"
                        onClick={() => onEdit(projectIndex, "todo", todoIndex, item)}
                      >
                        {item}
                      </span>
                    )}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(projectIndex, "todo", todoIndex, item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => onMarkDone(projectIndex, todoIndex)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDeleteTodo(projectIndex, todoIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Done Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Done</h3>
            {project.done.length === 0 ? (
              <EmptyState message="No completed tasks" />
            ) : (
              <ul className="space-y-2">
                {project.done.map((item, doneIndex) => (
                  <li key={doneIndex} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group border">
                    {editingItem.projectIndex === projectIndex &&
                    editingItem.type === "done" &&
                    editingItem.itemIndex === doneIndex &&
                    editingItem.subProjectIndex === -1 ? (
                      <input
                        type="text"
                        value={editingItem.value}
                        onChange={(e) => onUpdateEditValue(e.target.value)}
                        onBlur={onSaveEdit}
                        onKeyPress={handleEditKeyPress}
                        autoFocus
                        className="flex-1 p-2 rounded-md border"
                      />
                    ) : (
                      <span 
                        className="flex-1 cursor-pointer line-through text-gray-500"
                        onClick={() => onEdit(projectIndex, "done", doneIndex, item)}
                      >
                        {item}
                      </span>
                    )}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(projectIndex, "done", doneIndex, item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-yellow-600 hover:text-yellow-700"
                        onClick={() => onMarkTodo(projectIndex, doneIndex)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDeleteDone(projectIndex, doneIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sub-projects */}
        {project.subProjects.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Sub-Projects</h3>
            <div className="space-y-4">
              {project.subProjects.map((subProject, subProjectIndex) => (
                <Card key={subProjectIndex}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium text-blue-600">
                      {subProject.name}
                    </CardTitle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteSubProject(projectIndex, subProjectIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Sub-project Todo */}
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-600">To-Do</h4>
                        {subProject.todo.length === 0 ? (
                          <EmptyState message="No tasks yet" />
                        ) : (
                          <ul className="space-y-2">
                            {subProject.todo.map((item, todoIndex) => (
                              <li key={todoIndex} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group border text-sm">
                                {editingItem.projectIndex === projectIndex &&
                                editingItem.subProjectIndex === subProjectIndex &&
                                editingItem.type === "todo" &&
                                editingItem.itemIndex === todoIndex ? (
                                  <input
                                    type="text"
                                    value={editingItem.value}
                                    onChange={(e) => onUpdateEditValue(e.target.value)}
                                    onBlur={onSaveEdit}
                                    onKeyPress={handleEditKeyPress}
                                    autoFocus
                                    className="flex-1 p-2 rounded-md border text-sm"
                                  />
                                ) : (
                                  <span 
                                    className="flex-1 cursor-pointer"
                                    onClick={() => onEdit(projectIndex, "todo", todoIndex, item, subProjectIndex)}
                                  >
                                    {item}
                                  </span>
                                )}
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => onEdit(projectIndex, "todo", todoIndex, item, subProjectIndex)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-green-600 hover:text-green-700"
                                    onClick={() => onMarkDone(projectIndex, todoIndex, subProjectIndex)}
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => onDeleteTodo(projectIndex, todoIndex, subProjectIndex)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Sub-project Done */}
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-600">Done</h4>
                        {subProject.done.length === 0 ? (
                          <EmptyState message="No completed tasks" />
                        ) : (
                          <ul className="space-y-2">
                            {subProject.done.map((item, doneIndex) => (
                              <li key={doneIndex} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group border text-sm">
                                {editingItem.projectIndex === projectIndex &&
                                editingItem.subProjectIndex === subProjectIndex &&
                                editingItem.type === "done" &&
                                editingItem.itemIndex === doneIndex ? (
                                  <input
                                    type="text"
                                    value={editingItem.value}
                                    onChange={(e) => onUpdateEditValue(e.target.value)}
                                    onBlur={onSaveEdit}
                                    onKeyPress={handleEditKeyPress}
                                    autoFocus
                                    className="flex-1 p-2 rounded-md border text-sm"
                                  />
                                ) : (
                                  <span 
                                    className="flex-1 cursor-pointer line-through text-gray-500"
                                    onClick={() => onEdit(projectIndex, "done", doneIndex, item, subProjectIndex)}
                                  >
                                    {item}
                                  </span>
                                )}
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => onEdit(projectIndex, "done", doneIndex, item, subProjectIndex)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-yellow-600 hover:text-yellow-700"
                                    onClick={() => onMarkTodo(projectIndex, doneIndex, subProjectIndex)}
                                  >
                                    <ArrowUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => onDeleteDone(projectIndex, doneIndex, subProjectIndex)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
