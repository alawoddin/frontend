// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import DashboardLayout from "../components/Dashboardlayout";
import { FiUsers, FiShoppingCart, FiBell } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import api from './../axios';

export default function Dashboard() {

  const [stats, setStats] = useState({
  projects_count: 0,  // Fixed typo
  tasks_count: 0,
});

const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.log("Data fetch failed", error);
      // Optionally set default/fallback data
      setStats({
        project_count: 0,
        task_count: 0,
      });
    } finally {
      setLoading(false);
    }
  };
  
  fetchStats();
}, []); 

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      {loading ? (
        // Loading state - add your loading indicator here
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
            <div className="p-4 rounded-full bg-indigo-100 text-indigo-600">
              <GoProject size={28} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Project</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.projects_count}</p>
            </div>
          </div>

          {/* Sales Card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
            <div className="p-4 rounded-full bg-green-100 text-green-600">
              <FiShoppingCart size={28} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Task</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.tasks_count}</p>
            </div>
          </div>

          {/* Notifications Card */}
       
        </div>
      )}
    </DashboardLayout>
  );
}
