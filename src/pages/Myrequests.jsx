import React, { useEffect, useState } from "react";
import { getProjects } from "../api/api";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Foot from "../components/Footer";
import Loading from "../components/Loading";

const MyRequests = () => {
  const { isLoggedIn, email } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true); // new flag

  useEffect(() => {
    const fetchProjects = async () => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        logout(); // optional
        setAuthorized(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      
      try {
        const data = await getProjects(email);
        if (data.length === 0) {
          setAuthorized(false); // Email is not in the system
        } else {
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setAuthorized(false); // Treat API failure as not authorized
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchProjects();
  }, [email, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <p className="text-lg font-semibold text-gray-700">
          Please log in to view your submitted requests.
        </p>
      </div>
    );
  }

  if (loading) return <Loading />;

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <p className="text-lg font-semibold text-gray-700">
          No matching requests found for <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My 3D Printing Requests
        </h1>

        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">{p.type}</h2>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Description:</strong> {p.desc}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Deadline:</strong> {p.deadline}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Budget:</strong> {p.budget || "Not specified"}
              </p>
              <p className="text-sm text-blue-600 mt-2">
                <strong>Status:</strong> {p.status}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default MyRequests;
