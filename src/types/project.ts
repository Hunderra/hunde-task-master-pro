
export interface SubProject {
  name: string;
  todo: string[];
  done: string[];
}

export interface Project {
  project: string;
  todo: string[];
  done: string[];
  subProjects: SubProject[];
}

export interface ProjectStat {
  total: number;
  active: number;
  completed: number;
}
