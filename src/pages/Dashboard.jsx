// src/pages/Dashboard.jsx
import DashboardLayout from "../components/Dashboardlayout";
import { FiUsers, FiShoppingCart, FiBell } from "react-icons/fi";
import { GoProject } from "react-icons/go";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
          <div className="p-4 rounded-full bg-indigo-100 text-indigo-600">
            <GoProject size={28} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Users</h2>
            <p className="text-2xl font-bold text-gray-800">1,250</p>
          </div>
        </div>

        {/* Sales Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
          <div className="p-4 rounded-full bg-green-100 text-green-600">
            <FiShoppingCart size={28} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Sales</h2>
            <p className="text-2xl font-bold text-gray-800">$8,450</p>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
          <div className="p-4 rounded-full bg-red-100 text-red-600">
            <FiBell size={28} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Notifications</h2>
            <p className="text-2xl font-bold text-gray-800">23</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
