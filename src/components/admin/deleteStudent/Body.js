import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, deleteStudent } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [checkedValue, setCheckedValue] = useState([]);
  const [radioSelect, setRadioSelect] = useState(true);

  const [value, setValue] = useState({
    department: "",
    batch: "",
    stuId:""
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleInputChange = (e) => {
    const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const dltStudent = (e) => {
    setError({});
    setLoading(true);
    dispatch(deleteStudent(checkedValue));
  };

  useEffect(() => {
    if (store.admin.studentDeleted) {
      setValue({ department: "", batch: "" });
      setSearch(false);
      setLoading(false);
      dispatch({ type: DELETE_STUDENT, payload: false });
    }
  }, [store.admin.studentDeleted]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <DeleteIcon />
          <h1>Delete Faculty</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
        <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <div>
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio"
                    onClick={()=>setRadioSelect(true)}
                    checked
                  />
                </div>
                <div>
                  <label>Single</label>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  
                }}
              >
                <div>
                  <input
                    type="radio"
                    name="radio-1"
                    onClick={()=>setRadioSelect(false)}
                    className="radio"
                  />
                </div>
                <div>
                  <label>All</label>
                </div>
              </div>
            </div>
           <div>
              {/* form */}
              {
                !radioSelect&&
                <div>
                   <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              onChange={(e) =>
                setValue({ ...value, department: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <br />
            <label className="mt-2" htmlFor="batch">Batch</label><br />
            <input
              required
              placeholder="10"
              type="text"
              onChange={(e) => setValue({ ...value, batch: e.target.value })}
            />

            <button
              className={`${classes.adminFormSubmitButton} mt-3 w-56`}
              type="submit"
            >
              Search
            </button>
                </div>
              }
           </div>
           <div>
              {/* form */}
              {
                 radioSelect&&
                <div>
                   <label htmlFor="department">Department:</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              onChange={(e) =>
                setValue({ ...value, department: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <br />

           <label htmlFor="batch">Batch:</label> <br />
            <input
              required
              placeholder="10"
              type="text"
              onChange={(e) => setValue({ ...value, batch: e.target.value })}
            />
            <br />
          <label htmlFor="batch">StudentID:</label><br />
            <input
              required
              placeholder="ASHxxxxxxxM"
              type="text"
              onChange={(e) => setValue({ ...value, stuId: e.target.value })}
            />
           
           
            <button
              className={`${classes.adminFormSubmitButton} mt-3 w-56`}
              type="submit"
            >
              Search
            </button>
                </div>
              }
           </div>
          </form>
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noStudentError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError || error.backendError}
                </p>
              )}
            </div>
            {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              students?.length !== 0 && (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Name</th>
                        <th>StuID</th>
                        <th>Email</th>
                        <th>Session</th>
                        <th>Batch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students?.map((stu, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{stu.name}</td>
                          <td>{stu.stuId}</td>
                          <td>{stu.email}</td>
                          <td>{stu.year}</td>
                          <td>{stu.batch}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            {search && Object.keys(error).length === 0 && (
              <div className="space-x-3 flex items-center justify-center mt-5">
                <button
                  onClick={dltStudent}
                  className={`${classes.adminFormSubmitButton} bg-blue-500`}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
