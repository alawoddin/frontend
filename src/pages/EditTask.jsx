import { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/Dashboardlayout";

export default function EditTask() {
  const { id } = useParams(); // Get task ID from URL
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [info, setInfo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch task data and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch task data
        const taskResponse = await api.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const taskData = taskResponse.data;
        
        // Set form values from fetched task
        setProjectId(taskData.project_id?.toString() || "");
        setTitle(taskData.title || "");
        setStatus(taskData.status || "pending");
        setInfo(taskData.info || "");
        setDueDate(taskData.due_date ? taskData.due_date.split('T')[0] : "");

        // Fetch projects list
        const projectsResponse = await api.get("/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(projectsResponse.data);
        setTaskLoading(false);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load task data");
        setTaskLoading(false);
        
        if (error.response?.status === 404) {
          alert("Task not found!");
          navigate('/tasks');
        }
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!projectId) {
      alert("Please select a project");
      return;
    }
    
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Authentication token missing. Please login again.");
        navigate('/login');
        return;
      }

      await api.put(
        `/tasks/${id}`,
        {
          project_id: parseInt(projectId),
          title: title.trim(),
          info: info.trim() || "",
          status: status,
          due_date: dueDate || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      alert("Task updated successfully!");
      navigate("/tasks");
      
    } catch (error) {
      console.error("Error updating task:", error);
      
      if (error.response?.status === 422) {
        // Validation errors
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else if (error.response?.status === 404) {
        alert("Task not found. It may have been deleted.");
        navigate('/tasks');
      } else if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate('/login');
      } else {
        setError(error.response?.data?.message || "Failed to update task. Please try again.");
        alert(error.response?.data?.message || "Failed to update task. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

 

  if (taskLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="w-full bg-white shadow-md rounded-lg p-6">
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading task data...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="w-full bg-white shadow-md rounded-lg p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => navigate('/tasks')}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Back to Tasks
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Task
            </h2>
          
          </div>

          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              >
                <option value="">-- Select Project --</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter task description"
                rows="4"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
              ></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Updating...
                  </>
                ) : (
                  'Update Task'
                )}
              </button>
              
     
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}