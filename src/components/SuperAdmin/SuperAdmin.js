import React from "react";

const SuperAdmin = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="card  bg-base-100 shadow-2xl">
        <div className="">
        <ul className="">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
        </div>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
