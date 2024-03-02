import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [ufacultyItem, setufacultyItem] = useState("");
  const [ufaculty,setUfaculty ]=useState([]);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
    const fetchData=async()=>{
      setLoading(true);
      const {data} =await axios.get('http://localhost:5000/api/admin/get/ufaculty')
      setUfaculty(data?.faculty)
     }
     fetchData()
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addDepartment({ department ,ufaculty:ufacultyItem}));
    setDepartment("");
  };

  useEffect(() => {
    if (store.errors || store.admin.departmentAdded) {
      setLoading(false);
      if (store.admin.departmentAdded) {
        setDepartment("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_DEPARTMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.departmentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Subject</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className="flex py-10 ml-10 space-x-28">
              <div className="flex space-y-10 ">
                <div className="flex space-x-3">
                  <h1 className={classes.adminLabel}>Department :</h1>

                  <input
                    placeholder="Department"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div style={{
              marginLeft:'40px'
            }}>
            <span className={classes.adminLabel}>Faculty: </span>
           
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
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => setDepartment("")}
                className={classes.adminFormClearButton}
                type="button">
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Department"
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
    </div>
  );
};

export default Body;
