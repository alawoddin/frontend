import { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate, useParams } from "react-router-dom";

import {  } from "react-router-dom";

import DashboardLayout from "../components/Dashboardlayout";
import { toast } from "react-toastify";



const EditProject = () => {
const { id } = useParams();

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // for skeleton

  const Navigate = useNavigate();

    // fetch the data from API
  useEffect(() => {
    const fetchProject = async () => {
      setFetching(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitle(response.data.name || "");
        setInfo(response.data.info || "");
        // Ensure dueDate is YYYY-MM-DD for input[type=date]
        if (response.data.due_date) {
          setDueDate(new Date(response.data.due_date).toISOString().split("T")[0]);
        }
      } catch (error) {
        console.log("Error loading project:", error.response?.data || error);
        alert("Failed to load project data.");
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id]);




   const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    
    // ✅ Changed from .post() to .put() or .patch()
    await api.put(`/projects/${id}`, {
      name: title,
      info: info,
      due_date: dueDate
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // alert("Project updated successfully!"); // Changed message
    toast.success("Project updated successfully!");
    Navigate('/projects');
    
  } catch (error) {
    console.log("Error updating project:", error.response?.data || error);
    // alert("Failed to update project. Please try again.");
    toast.error("Failed to update project. Please try again.");
  } finally {
    setLoading(false);
  }
}


  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Project</h2>

          {fetching ? (
            // 🔹 Skeleton loader
            <div className="space-y-4 w-full animate-pulse">
              <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
              <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-24 w-full bg-gray-300 rounded"></div>
              <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-blue-600 rounded"></div>
            </div>
          ) : (
            <form className="space-y-4 w-full" onSubmit={handleUpdate}>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter project title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="Enter project description"
                  rows="4"
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                  required
                ></textarea>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
                >
                  {loading ? "Updating Project..." : "Update Project"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>

  )
}

export default EditProject
