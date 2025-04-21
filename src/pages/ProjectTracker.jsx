import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { getProjects, deleteProject, updateProjectStatus } from '../api/api';
import Loading from '../components/Loading';
import { Calendar, Clock, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ProjectTracker = () => {
  const { userEmail } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchProjects = async () => {
    if (!userEmail) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getProjects(userEmail);
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, [userEmail]);
  
  const handleDelete = async (projectId) => {
    if (!userEmail) return;
    
    try {
      await deleteProject(userEmail, projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
    }
  };
  
  const handleStatusChange = async (projectId, newStatus) => {
    if (!userEmail) return;
    
    try {
      await updateProjectStatus(userEmail, projectId, newStatus);
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status: newStatus } : project
      ));
    } catch (err) {
      console.error('Error updating project status:', err);
      setError('Failed to update project status. Please try again.');
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
      <div className="bg-gradient-to-r from-accent-600 to-accent-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Projects</h1>
          <p className="text-xl text-accent-100 max-w-3xl">
            Track the status of your 3D printing projects and view submission details.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
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
            {projects.map(project => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{project.name}'s Project</h2>
                      <p className="text-sm text-gray-500">
                        Submitted on {formatDate(project.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColorClasses(project.status)}`}>
                        {project.status}
                      </span>
                      <div className="relative group">
                        <button 
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          onClick={() => handleDelete(project.id)}
                          aria-label="Delete project"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <span className="absolute right-0 top-10 w-24 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete project
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">Project Type</h3>
                      <p className="text-gray-900">{project.projectType}</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
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
                      <div className="flex-shrink-0 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Estimated Completion</h3>
                        <p className="text-gray-900">
                          {project.status === 'Done' 
                            ? 'Completed' 
                            : project.status === 'In Progress' 
                              ? '7-10 days' 
                              : '2-3 weeks'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded">{project.description}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange(project.id, 'Pending')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          project.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                        }`}
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(project.id, 'In Progress')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        In Progress
                      </button>
                      <button
                        onClick={() => handleStatusChange(project.id, 'Done')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          project.status === 'Done'
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                        }`}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Done
                      </button>
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
