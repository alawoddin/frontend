import DashboardLayout from "../components/Dashboardlayout";

import api from "../axios";


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [Projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(); // ✅ IMPORTANT
  }, []);
return (
  <DashboardLayout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Projects
      </h1>

      {loading ? (
        // 🔹 SKELETON LOADING
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["S.No", "Title", "Description", "Due Date", "Actions"].map(
                  (_, i) => (
                    <th key={i} className="px-6 py-3"></th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 w-10 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <div className="h-8 w-14 bg-gray-300 rounded"></div>
                    <div className="h-8 w-14 bg-gray-300 rounded"></div>
                    <div className="h-8 w-14 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : Projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        // 🔹 REAL DATA TABLE
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Projects.map((project, index) => (
                <tr key={project.id ?? index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {project.info}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {project.due_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                      View
                    </button>
                    <Link to={`/project/edit/${project.id}`} className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition">
                      Edit
                    </Link>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </DashboardLayout>
);
}
