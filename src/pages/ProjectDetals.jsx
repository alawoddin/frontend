import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Dashboardlayout";
import { useParams } from "react-router-dom";
import api from "../axios";

export default function ProjectDetails() {
    const { id } = useParams();
    
    // ✅ FIXED: Corrected spelling from "pojectDetails" to "projectDetails"
    const [projectDetails, setProjectDetails] = useState(null); // Changed from [] to null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch project details
    useEffect(() => {
        // Check if id exists
        if (!id) {
            setError("Project ID not found");
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await api.get(`/projects/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Project Details:", response.data);
                console.log("Tasks data:", response.data?.tasks);
                
                setProjectDetails(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching project details:", error);
                setError("Failed to load project details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    // Show loading state
    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading project details...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // Show error state
    if (error) {
        return (
            <DashboardLayout>
                <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
                        <h3 className="font-bold text-lg mb-2">Error</h3>
                        <p>{error}</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // Check if projectDetails is loaded
    if (!projectDetails) {
        return (
            <DashboardLayout>
                <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                        <p className="text-lg">No project data found.</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Debug Info - Remove in production */}
              

                {/* Project Info Card */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {projectDetails.name || projectDetails.title || "Untitled Project"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {projectDetails.info || projectDetails.description || "No description available"}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <div>
                            <span className="text-sm text-gray-500">Due Date</span>
                            <p className="text-gray-800 font-medium">
                                {projectDetails.due_date 
                                    ? new Date(projectDetails.due_date).toLocaleDateString()
                                    : "Not set"}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Status</span>
                            <p className="text-gray-800 font-medium">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    projectDetails.status === 'completed' 
                                        ? 'bg-green-100 text-green-800'
                                        : projectDetails.status === 'in_progress'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {projectDetails.status || 'pending'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tasks Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Task Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {/* ✅ FIXED: Using correct variable name and checking if tasks exist */}
                            {projectDetails.tasks && projectDetails.tasks.length > 0 ? (
                                projectDetails.tasks.map((task, index) => (
                                    <tr key={task.id || task._id || index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {task.name || task.title || "Untitled Task"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {task.info || task.description || "No description"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                task.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : task.status === 'in_progress'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {task.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {task.due_date 
                                                ? new Date(task.due_date).toLocaleDateString()
                                                : "Not set"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        {projectDetails.tasks 
                                            ? "No tasks found for this project" 
                                            : "Tasks data not available"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}