/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="bg-slate-900 text-base-100">
        <div className="text-2xl py-3 text-center">
          <h1>
            <i className="fas fa-atlas mx-2"></i>University Result Management
          </h1>
        </div>
      </div>
      <div className="navbar  bg-neutral text-neutral-content">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">
            <i className="fas mx-2 fa-phone-alt"></i>+8801777777
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-xl menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Service</a>
            </li>
            <li>
              <a>Review</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/all/login" className="btn btn-info btn-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
