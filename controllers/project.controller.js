import projects from "../models/projects.model";

const getProjectsController = (req, res) => {
  res.send(projects);
};

export { getProjectsController };
