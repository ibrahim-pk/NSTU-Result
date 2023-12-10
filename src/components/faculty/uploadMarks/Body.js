import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, uploadMark } from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import {
  DELETE_DEPARTMENT,
  MARKS_UPLOADED,
  SET_ERRORS,
} from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";
import { getAllDepartment } from "../../../redux/actions/adminActions";
import axios from "axios";
const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const tests = store.faculty.tests.result;
  const [students, seTstudents] = useState([]);
  const [allSubject, setAllSubject] = useState([]);
  const [result, setResult] = useState([]);

  const departments = useSelector((state) => state.admin.allDepartment);
  //console.log(departments);

  const [value, setValue] = useState({
    department: "",
    year: "",
    section: "",
    test: "",
    batch: "",
    courseCode: "",
    id: "",
  });
  const [search, setSearch] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    department:"",
    year:"",
    term:"",
    code:"",
    fristEx: "",
    secondEx: "",
    ThirdEx:"",
    CtAtt:"",
    
    // Add other fields as needed
  });

  const handleInputChange = (e, sname, id) => {
   // console.log(sname,id);
    setFormData({ ...formData, name:sname,id:id,ThirdEx:((parseInt(formData.fristEx)+parseInt(formData.secondEx))/2).toFixed(2) })
    //setFormData({ ...formData, id:id })
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Object.keys(store.errors)?.length !== 0) {
      setError(store.errors);
      setLoading(false);
     
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.admin) {
      setLoading(false);
      dispatch(getAllDepartment());
    }
  }, []);

  // const handleInputChange = (value, _id) => {
  //   const newMarks = [...marks];
  //   let index = newMarks.findIndex((m) => m._id === _id);
  //   if (index === -1) {
  //     newMarks.push({ _id, value });
  //   } else {
  //     newMarks[index].value = value;
  //   }
  //   setMarks(newMarks);
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(value);
    setFormData({ ...formData, department:value.department,year:value.year,term:value.section})
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
    const {data}=await axios.post("http://localhost:5000/api/faculty/getstudent",value)
    console.log(data);
    seTstudents(data?.result)
    setAllSubject(data?.subject)
    setResult(data?.rslt)
  };


 const handleCode=(e)=>{
  setValue({ ...value, courseCode: e.target.value })
  setFormData({ ...formData, code: e.target.value })
  handleSubmit(e)
 }

  // const students = useSelector((state) => state.admin.students.result);
  // const allSubject = useSelector((state) => state.admin.students.subject);
  // //console.log(students);

  const uploadMarks = (e) => {
   console.log(formData);
    setError({});
    dispatch(uploadMark(formData));
  };

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    setValue({ ...value, department: user.result.department });
  }, []);

  useEffect(() => {
    if (store.errors || store.faculty.marksUploaded) {
      setLoading(false);
      if (store.faculty.marksUploaded) {
        setSearch(false);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: MARKS_UPLOADED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.marksUploaded]);

  useEffect(() => {
    if (value.year !== "" && value.section !== "") {
      dispatch(getTest(value));
    }
  }, [value.year, value.section]);

  return (
    <div className="flex-[0.8] mt-2">
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}
          >
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
            <label htmlFor="batch">Id</label>
            <input
              
              value={value.id}
              onChange={(e) => setValue({ ...value, id: e.target.value })}
              placeholder="ASHxxxxxxxM"
              required
              className={classes.adminInput}
              type="text"
              style={{
                width:'225px'
              }}
            />
            <label htmlFor="batch">Batch</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.batch}
              onChange={(e) => setValue({ ...value, batch: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="14">14</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="16">16</MenuItem>
              <MenuItem value="17">17</MenuItem>
              <MenuItem value="18">18</MenuItem>
            </Select>
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.year}
              onChange={(e) => setValue({ ...value, year: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
            <label htmlFor="section">Term</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.section}
              onChange={(e) => setValue({ ...value, section: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
            {allSubject?.length > 0 && (
              <div>
                <label htmlFor="department">Course</label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.courseCode}
                  onChange={(e)=>handleCode(e)}
                    

                >
                  <MenuItem value="">None</MenuItem>
                  {allSubject?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.subjectCode}>
                      {dp.subjectCode}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit"
            >
              Search
            </button>
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
              Object.keys(error)?.length === 0 &&
              students?.length !== 0 && (
                <div className={`${classes.adminData} h-[20rem]`}>
                  <div className="grid grid-cols-8">
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Sr
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Name
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      ID
                    </h1>

                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      1st Examiner
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      2nd Examiner
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Final Marks
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      CT+Att
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Diff
                    </h1>
                  </div>
                  {students?.map((stu, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-8`}
                    >
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {stu.name}
                      </h1>
                      <h1
                      style={{
                        marginRight:'10px'
                       }}
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {stu.stuId}
                      </h1>

                      <div
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        <input
                          name="fristEx"
                          value={result[0]?.fristEx}
                          onChange={(e) =>
                            handleInputChange(e, stu.name, stu.stuId)
                          }
                          className="col-span-2 border-2 w-24 px-2 h-8"
                          type="text"
                        />
                      </div>

                      <div
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        <input
                          name="secondEx"
                          value={result[0]?.secondEx}
                          onChange={(e) =>
                            handleInputChange(e, stu.name, stu.stuId)
                          }
                          className="col-span-2 border-2 w-24 px-2 h-8"
                          type="text"
                        />
                      </div>

                      <div
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        <input
                         name="ThirdEx"             
                         value={result[0]?.ThirdEx}
                          className="col-span-2 border-2 w-24 px-2 h-8 "
                          type="text"
                          disabled
                        />
                      </div>

                      <div
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        <input
                          name="CtAtt"
                          value={result[0]?.CtAtt}
                          onChange={(e) =>
                            handleInputChange(e, stu.name, stu.stuId)
                          }
                          className="col-span-2 border-2 w-24 px-2 h-8"
                          type="text"
                        />
                      </div>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {
                         Math.abs(parseInt(result[0]?.fristEx)-parseInt(result[0]?.secondEx))>14?
                         <h3 style={{
                          color:'red',
                          marginLeft:'10px'
                         }}>{Math.abs(parseInt(result[0]?.fristEx)-parseInt(result[0]?.secondEx))}</h3>:
                         <h3 style={{
                          color:'green',
                          marginLeft:'10px'
                         }}>
                          {Math.abs(parseInt(result[0]?.fristEx)-parseInt(result[0]?.secondEx))}
                         </h3>
                        }
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            {search && Object.keys(error)?.length === 0 && (
              <div className="">
                {allSubject?.length > 0 && (
                  <button
                    onClick={uploadMarks}
                    className={`${classes.adminFormSubmitButton} bg-blue-500 mt-5 ml-[22rem]`}
                  >
                    Upload
                  </button>
                )}
              </div>
            )}
            {(error.examError || error.backendError) && (
              <p className="text-red-500 text-2xl font-bold ml-32">
                {error.examError || error.backendError}
              </p>
            )}
          </div>
        </div>
      
    </div>
  );
};

export default Body;
