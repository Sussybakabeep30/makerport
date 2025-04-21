const BASE = 'https://68062528ca467c15be6b564d.mockapi.io/briefs'; // replace with your MockAPI endpoint

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
