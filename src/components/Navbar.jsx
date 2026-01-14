import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-sm text-white w-full">
      {/* Top Banner */}
      <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
        <p>
          Exclusive Price Drop! Hurry,{" "}
          <span className="underline underline-offset-2">Offer Ends Soon!</span>
        </p>
      </div>

      {/* Navbar */}
      <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">
        {/* Text Logo */}
        <Link to="/" className="text-2xl font-bold text-violet-600">
          PM-APP
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 md:pl-28">
          <li>
            <Link to="/" className="hover:text-violet-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-violet-600">
              About
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-violet-600">
              Portfolio
            </Link>
          </li>
        </ul>

        {/* Desktop Button */}
        <button className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all">
          Get started
        </button>

        {/* Mobile Menu Button */}
        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden">
            <ul className="flex flex-col space-y-4 text-lg">
              <li>
                <a href="#" className="text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Pricing
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
            >
              Get started
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
