import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { fetchBriefs, deleteBrief } from '../api/api';
import Loading from '../components/Loading';

const ProjectTracker = () => {
  const { isLoggedIn, email } = useUser();
  const navigate = useNavigate();
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);

  // auth guard
  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  // load briefs
  useEffect(() => {
    (async () => {
      const api = await fetchBriefs();
      const local = JSON.parse(localStorage.getItem(`briefs_${email}`)) || [];
      setBriefs([...api, ...local]);
      setLoading(false);
    })();
  }, [email]);

  if (loading) return <Loading />;

  const handleDelete = async (id, idx) => {
    if (id) await deleteBrief(id);
    const filtered = briefs.filter((_, i) => i !== idx);
    setBriefs(filtered);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Your Project Requests</h2>
      <div className="space-y-4">
        {briefs.map((b, i) => (
          <div key={i} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p><strong>Type:</strong> {b.type}</p>
              <p><strong>Desc:</strong> {b.desc}</p>
              <p><strong>Deadline:</strong> {b.deadline}</p>
              <p><strong>Status:</strong> {b.status || 'Pending'}</p>
            </div>
            <button
              onClick={() => handleDelete(b.id, i)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTracker;
