
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
