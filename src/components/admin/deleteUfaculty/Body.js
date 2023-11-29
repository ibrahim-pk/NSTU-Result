import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartment,
  deleteUfaculty,
  getAllDepartment,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { DELETE_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const Body = () => {
  const dispatch = useDispatch();
  const [ufacultyItem, setufacultyItem] = useState("");
  const [error, setError] = useState({});
  const [ufaculty,setUfaculty ]=useState([]);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
   const fetchData=async()=>{
    setLoading(true);
    const {data} =await axios.get('https://nstu-result-server-g51ilrof1-ibrahimecste.vercel.app/api/admin/get/ufaculty')
    setUfaculty(data?.faculty)
   }
   fetchData()


  }, [store.errors]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const {data} =await axios.post('https://nstu-result-server-g51ilrof1-ibrahimecste.vercel.app/api/admin/delete/ufaculty',{ufaculty:ufacultyItem})
    if(data.success){
      toast.success(data?.msg)
    }else{
      toast.error(data?.error)
    }
   console.log(data);
    setUfaculty("");
    setLoading(false);
  };






  const faculties = useSelector((state) => state.admin.faculties.result);






  useEffect(() => {
    if (store.admin.departmentDeleted) {
      setLoading(false);
      setufacultyItem("");
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [store.admin.departmentDeleted]);
  
  useEffect(() => {
    if (faculties?.length !== 0) {
      setLoading(false);
    }
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>All Faculty</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}>
            <label htmlFor="department">Faculty</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={ufacultyItem}
              onChange={(e) => setufacultyItem(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              {ufaculty.length>0 &&ufaculty.map((dp, idx) => (
                <MenuItem key={idx} value={dp.ufaculty}>
                  {dp.ufaculty}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit">
              Delete
            </button>
          </form>
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Deleting"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noFacultyError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noFacultyError || error.backendError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Body;
