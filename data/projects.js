import projectsData from "./projects.json";

export const CATEGORIES = projectsData.categories;
export const projects = projectsData.projects;
export const featuredProjects = projects.filter((p) => p.featured);
