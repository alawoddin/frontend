import React from 'react'

const Home = () => {
  return (
   <div className="flex flex-col min-h-screen bg-gray-50">
  {/* Hero Section */}
  <header
    className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white"
  >
    <div className="container mx-auto px-6 py-24 md:py-32 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Manage Your Projects & Tasks <br />
        with Ease
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
        A modern task and project management app built with Laravel, React, and
        MySQL. Stay productive, stay organized, and achieve more every day.
      </p>
      <div className="space-x-4">
        <a
          href="/register"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          Get Started Free
        </a>
        <a
          href="/login"
          className="inline-block border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-700 transition transform hover:scale-105"
        >
          Login
        </a>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        className="w-full h-20 text-gray-50"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d="M0,192L1440,64L1440,320L0,320Z"></path>
      </svg>
    </div>
  </header>

  {/* Features Section */}
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Why Choose Our App?
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        <div
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">
            🚀 Easy Task Management
          </h3>
          <p className="text-gray-600">
            Create, update, and track your tasks in a clean, intuitive
            interface.
          </p>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">
            📂 Organize Projects
          </h3>
          <p className="text-gray-600">
            Group tasks into projects and keep everything structured and
            efficient.
          </p>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">
            ⏳ Boost Productivity
          </h3>
          <p className="text-gray-600">
            Stay focused with priorities, deadlines, and progress tracking.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Call to Action */}
  <section className="py-20 bg-indigo-700 text-white text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Start Managing Your Work Today
      </h2>
      <p className="mb-8 text-lg text-indigo-200">
        Sign up for free and experience a smarter way to organize your tasks and
        projects.
      </p>
      <a
        href="/register"
        className="bg-white text-indigo-700 font-semibold px-10 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
      >
        Create an Account
      </a>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
    <div className="container mx-auto px-6 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Task & Project Manager. All rights
        reserved.
      </p>
    </div>
  </footer>
</div>

  )
}

export default Home
