import { useEffct, useState } from "react";
import axios from "axios";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [stuId, setStuId] = useState("");

  const handleSubmit = async () => {
    const { data } = await axios.put(
      "http://localhost:5000/api/student/resetpassword",
      { email, stuId }
    );

    console.log(data);
    alert(data?.data);
    setTimeout(() => {
      window.location.href = "/login/studentlogin";
    }, 1000);
  };
  return (
    <div class="bg-gray-100 flex justify-center items-center h-screen">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label className="input my-2 input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="enter your email"
            className="p-2"
          />
        </label>
        <label className="input my-2 input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            onChange={(e) => setStuId(e.target.value)}
            type="text"
            placeholder="enter your stuId"
            className="p-2"
          />
        </label>

        <button className="btn btn-sm btn-info my-2" onClick={handleSubmit}>Reset</button>
      </div>
    </div>
  );
};

export default ResetPassword;
