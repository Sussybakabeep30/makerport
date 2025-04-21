import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { getProjects, deleteProject, updateProjectStatus } from '../api/api';

import Loading from '../components/Loading';

const ProjectTracker = () => {
  const { userEmail } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    if (!userEmail) {
      console.log("User email not available yet");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allProjects = await getProjects(userEmail); // Pass userEmail here
      console.log("Projects fetched:", allProjects);
      setProjects(allProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchProjects();
    } else {
      console.log("Waiting for userEmail...");
      setLoading(false); // Prevent infinite loading
    }
  }, [userEmail]);

  const handleDelete = async (projectId) => {
    if (!userEmail) return;

    try {
      await deleteProject(userEmail, projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project. Please try again.");
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    if (!userEmail) return;

    try {
      await updateProjectStatus(userEmail, projectId, newStatus);
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update project status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColorClasses = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-600 to-accent-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Projects</h1>
          <p className="text-xl text-accent-100 max-w-3xl">
            Track the status of your 3D printing projects and view submission details.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't submitted any project briefs yet. Get started by creating a new project.
            </p>
            <a
              href="/client-form"
              className="inline-block px-6 py-3 bg-accent-500 text-white font-medium rounded-md hover:bg-accent-600 transition-colors"
            >
              Submit a Brief
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
              >
                <div className="p-6">
                  {/* Header Info */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{project.name}'s Project</h2>
                      <p className="text-sm text-gray-500">Submitted on {formatDate(project.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColorClasses(project.status)}`}>
                        {project.status}
                      </span>
                      <div className="relative group">
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          aria-label="Delete project"
                        >
                          🗑️
                        </button>
                        <span className="absolute right-0 top-10 w-24 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete project
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">Project Type</h3>
                      <p className="text-gray-900">{project.projectType}</p>
                    </div>
                    <div className="flex items-start">
                      <span className="mt-1">📅</span>
                      <div className="ml-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Deadline</h3>
                        <p className="text-gray-900">{formatDate(project.deadline)}</p>
                      </div>
                    </div>
                    {project.budget && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Budget</h3>
                        <p className="text-gray-900">{project.budget}</p>
                      </div>
                    )}
                    <div className="flex items-start">
                      <span className="mt-1">⏰</span>
                      <div className="ml-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Estimated Completion</h3>
                        <p className="text-gray-900">
                          {project.status === 'Done'
                            ? 'Completed'
                            : project.status === 'In Progress'
                              ? '7–10 days'
                              : '2–3 weeks'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded">{project.description}</p>
                  </div>

                  {/* Status Buttons */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Pending', 'In Progress', 'Done'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(project.id, status)}
                          className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            project.status === status
                              ? getStatusColorClasses(status) + ' border'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status === 'Pending' && '⚠️'}
                          {status === 'In Progress' && '⏳'}
                          {status === 'Done' && '✅'} {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTracker;
