const BASE = 'https://68062528ca467c15be6b564d.mockapi.io/briefs'; // Replace with your MockAPI endpoint

// GET all projects
export const getProjects = () =>
  fetch(BASE).then(res => res.json());

// POST a new project
export const postBrief = (data) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

// DELETE a project
export const deleteProject = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' });

// UPDATE a project status
export const updateProjectStatus = (id, updatedData) =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  }).then(res => res.json());
