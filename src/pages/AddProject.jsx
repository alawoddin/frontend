import {  useState } from "react";

import api from "../axios";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/Dashboardlayout";

export default function AddProject() {

    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        await api.post('/projects' , {
          name: title,
          info: info,
          due_date: dueDate
        }, {
          headers : {
            Authorization: `Bearer ${token}`
          }
        });

        alert ("Project added successfully!");

        Navigate('/projects');
      } catch (error) {
        console.log("error is adding in project" , error);
        alert("Failed to add project. Please try again.");
         
      } finally {
        setLoading(false);
      }
    }
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Project
          </h2>

          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
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
                {loading ? "Adding Project..." : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
