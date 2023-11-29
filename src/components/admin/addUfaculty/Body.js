import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "../../../utils/Spinner";

import * as classes from "../../../utils/styles";
import axios from "axios";
const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ufaculty, setUfaculty] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    const {data} =await axios.post('https://nstu-result-server-g51ilrof1-ibrahimecste.vercel.app/api/admin/add/ufaculty',{ufaculty})
    if(data.success){
      toast.success(data?.msg)
    }else{
      toast.error(data?.error)
    }
   console.log(data);
    setUfaculty("");
    setLoading(false);
  };



  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Faculty</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className="flex py-10 ml-10 space-x-28">
              <div className="flex space-y-10 ">
                <div className="flex space-x-3">
                  <h1 className={classes.adminLabel}>Faculty :</h1>

                  <input
                    placeholder="Faculty"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={ufaculty}
                    onChange={(e) => setUfaculty(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => setUfaculty("")}
                className={classes.adminFormClearButton}
                type="button">
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Faculty"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.departmentError || error.backendError) && (
                <p className="text-red-500">
                  {error.departmentError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Body;
