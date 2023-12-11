import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div
      className="h-screen w-screen backdrop-blur-md flex  justify-center"
      style={{
        backgroundImage: `url("https://notesread.com/wp-content/uploads/2018/11/types-of-students.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center mt-10 space-y-32">
        <h1 className="text-3xl font-semibold bg-black text-white w-full text-center py-4 bg-opacity-75 rounded-2xl">
          University Result Management System
        </h1>

        <div className="flex justify-center">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to our platform</h1>
        <div className="flex justify-center my-2 py-2">
          <div>
          <Link to="/login/adminlogin" className="btn-admin mx-2">
            Admin
          </Link>
          </div>
          <div>
          <Link to="/login/facultylogin" className="btn-teacher mx-2">
            Teacher
          </Link>
          </div>
          <div>
          <Link to="/login/studentlogin" className="btn-student mx-2">
            Student
          </Link>
          </div>
        </div>
      </div>
    </div>
       </div>
    </div>
  );
};

export default Login;
