const BASE = 'https://mockapi.io/projects'; // replace with your MockAPI endpoint

export const fetchBriefs = () =>
  fetch(BASE).then(res => res.json());

export const postBrief = (data) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteBrief = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' });
