const BASE = 'https://68062528ca467c15be6b564d.mockapi.io/briefs'; // Replace with your MockAPI endpoint

export const getProjects = (userEmail) => {
  const url = userEmail ? `${BASE}?email=${userEmail}` : BASE;
  return fetch(url).then(res => res.json());
};

// POST a new project
export const postBrief = (data) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

// DELETE a project
export const deleteProject = (userEmail, projectId) =>
  fetch(`${BASE}/${projectId}`, { method: 'DELETE' });

// UPDATE a project status
export const updateProjectStatus = (userEmail, projectId, newStatus) =>
  fetch(`${BASE}/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  }).then(res => res.json());