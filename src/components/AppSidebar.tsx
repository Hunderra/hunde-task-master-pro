
import { ProjectCounter } from "./ProjectCounter"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Check, ArrowUp } from "lucide-react"
import { Project } from "@/types/project"
import { Input } from "@/components/ui/input"

interface AppSidebarProps {
  projects?: Project[]
  onProjectSelect?: (projectId: string) => void
  selectedProject?: string
}

export function AppSidebar({ projects = [], onProjectSelect, selectedProject }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-semibold">Projects</h2>
          <SidebarTrigger />
        </div>
        <div className="px-4 pb-4">
          <Input placeholder="Search projects..." />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="All active tasks"
                isActive={!selectedProject}
                onClick={() => onProjectSelect?.("")}
              >
                <button className="w-full">
                  <ArrowUp />
                  <span>Active Tasks</span>
                  <ProjectCounter
                    count={projects.reduce((acc, project) => 
                      acc + project.todo.length + 
                      project.subProjects.reduce((subAcc, sub) => subAcc + sub.todo.length, 0), 0
                    )}
                  />
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Completed tasks"
                asChild
              >
                <button className="w-full">
                  <Check />
                  <span>Completed</span>
                  <ProjectCounter
                    count={projects.reduce((acc, project) => 
                      acc + project.done.length + 
                      project.subProjects.reduce((subAcc, sub) => subAcc + sub.done.length, 0), 0
                    )}
                  />
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.project}>
                <SidebarMenuButton
                  tooltip={project.project}
                  isActive={selectedProject === project.project}
                  onClick={() => onProjectSelect?.(project.project)}
                  asChild
                >
                  <button className="w-full">
                    <span>{project.project}</span>
                    <ProjectCounter
                      count={project.todo.length + 
                        project.subProjects.reduce((acc, sub) => acc + sub.todo.length, 0)}
                    />
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
