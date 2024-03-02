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
    degree: "",
  });
  const [search, setSearch] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    department: "",
    year: "",
    term: "",
    subTitle:"",
    code: "",
    credit: "",
    fristEx: "", 
    secondEx: "",
    ThirdEx: "",
    CtAtt: "",
    finalRes:""

    // Add other fields as needed
  });

  // const handleInputChange = (e, sname, id) => {
  //   const { name, value } = e.target;
  //   console.log("Input Name:", name);
  //   console.log("Input Value:", value);
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     name: sname,
  //     id: id,
  //     [name]: value,
  //     ThirdEx: ((parseFloat(prevFormData.fristEx) + parseFloat(prevFormData.secondEx)) / 2).toFixed(2)
  //   }));
  // };



  const handleInputChange = (e, sname, id) => {
    // console.log(sname,id);
    setFormData({
      ...formData,
      name: sname,
      id: id,

      // ThirdEx: (
      //   (parseFloat(formData.fristEx) + parseFloat(formData.secondEx)) /
      //   2
      // ).toFixed(2),
    });
    //setFormData({ ...formData, id:id })
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const uploadMarks = () => {
    console.log("marks:",formData);
    setError({});
    dispatch(uploadMark(formData));
    setFormData({
      ...formData,
      fristEx:"",
      secondEx:"",
      ThirdEx:"",
      CtAtt:"",
      credit:"",
      subTitle:""
    })

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(value);
    setFormData({
      ...formData,
      department: value.department,
      year: value.year,
      term: value.section,
    });
    setSearch(true);
    setLoading(true);
    setError({});
    // dispatch(getStudent(value));
    const { data } = await axios.post(
      "http://localhost:5000/api/faculty/getstudent",
      value
    );
    console.log("Rslt:", data);
    seTstudents(data?.result);
    setAllSubject(data?.subject);
    setResult(data?.rslt);
  };

  const handleCode = (e) => {
    setValue({ ...value, courseCode: e.target.value });
    setFormData({ ...formData, code: e.target.value });

    // setFormData({ ...formData, code: e.target.value })
    // handleSubmit(e)
  };

  // const students = useSelector((state) => state.admin.students.result);
  // const allSubject = useSelector((state) => state.admin.students.subject);
  // //console.log(students);

 

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

  const handleCredit=(credit,title)=>{
    console.log(credit,title);
    setFormData({ ...formData, credit:credit,subTitle:title});
    
  }

  return (
    <div className="flex-[0.8] mt-2">
      <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
        <form
          className="flex flex-col space-y-2 col-span-1"
          onSubmit={handleSubmit}
        >
          <label htmlFor="department">Degree</label>
          <Select
            required
            displayEmpty
            sx={{ height: 36, width: 224 }}
            inputProps={{ "aria-label": "Without label" }}
            value={value.degree}
            onChange={(e) => setValue({ ...value, degree: e.target.value })}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Bsc">Bsc</MenuItem>
            <MenuItem value="Msc">Msc</MenuItem>
          </Select>
          <label htmlFor="department">Department</label>
          <Select
            required
            displayEmpty
            sx={{ height: 36, width: 224 }}
            inputProps={{ "aria-label": "Without label" }}
            value={value.department}
            onChange={(e) => setValue({ ...value, department: e.target.value })}
          >
            <MenuItem value="">None</MenuItem>
            {departments?.map((dp, idx) => (
              <MenuItem key={idx} value={dp.department}>
                {dp.department}
              </MenuItem>
            ))}
          </Select>
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
                onChange={(e) => handleCode(e)}
              >
                <MenuItem value="">None</MenuItem>
                {allSubject?.map((dp, idx) => (
                  <MenuItem onClick={()=>handleCredit(dp?.credit,dp?.subjectName)} key={idx} value={dp.subjectCode}>
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
          {!loading &&Object.keys(error)?.length === 0 &&
            students?.length !== 0&& value?.courseCode? (
            
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Sr no</th>
                      <th>Name</th>
                      <th>StuID</th>
                      <th>1st Examiner</th>
                      <th>2nd Examiner</th>
                      <th>CT+ATT</th>
                      <th>Difference</th>
                      <th>3rd Exaniner</th>
                      <th>Final Mark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.map((stu, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{stu.name}</td>
                        <td>{stu.stuId}</td>
                        <td>
                        <div class="flex">
                            <div>
                              <input
                                type="number"
                                name="fristEx"
                                // value={result[0]?.fristEx}
                                onChange={(e) =>handleInputChange(e, stu.name, stu.stuId)}
                                className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                placeholder="Enter Number"
                              />
                            </div>
                            <div>
                             <button
                              onClick={uploadMarks}
                             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
                               save
                              </button>
                             </div>
                            <div>
                              <input
                                type="text"
                                value={(result.find(res => res.id === stu.stuId)?.fristEx) || ''}
                                className="border border-gray-300  px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                disabled
                              />
                            </div>
                             
                          </div>                       
                        </td>
                        <td >
                          <div class="flex">
                            <div>
                              <input
                                type="number"
                                name="secondEx"
                                // value={result[0]?.fristEx}
                                onChange={(e) =>handleInputChange(e, stu.name, stu.stuId)}
                                className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                placeholder="Enter Number"
                              />
                            </div>
                            <div>
                             <button
                              onClick={uploadMarks}
                             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
                               save
                              </button>
                             </div>
                            <div>
                              <input
                                type="text"
                                value={(result.find(res => res.id === stu.stuId)?.secondEx) || ''}
                                class="border border-gray-300  px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                disabled
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          
                         
                         <div class="flex">
                            <div>
                              <input
                                type="number"
                                name="CtAtt"
                                // value={result[0]?.fristEx}
                                onChange={(e) =>handleInputChange(e, stu.name, stu.stuId)}
                                class="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                placeholder="Enter Number"
                              />
                            </div>
                            <div>
                             <button
                              onClick={uploadMarks}
                             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
                               save
                              </button>
                             </div>
                            <div>
                              <input
                                type="text"
                                value={(result.find(res => res.id === stu.stuId)?.CtAtt) || ''}
                                class="border border-gray-300  px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                disabled
                              />
                            </div>
                          </div>


                        </td>

                        <td>
                          {Math.abs(
                            parseFloat(
                              result.find((res) => res.id === stu.stuId)
                                ?.fristEx || ""
                            ) -
                              parseFloat(
                                result.find((res) => res.id === stu.stuId)
                                  ?.secondEx || ""
                              )
                          ) > 14 ? (
                            <h3
                              style={{
                                color: "red",
                                marginLeft: "10px",
                              }}
                            >
                              {Math.abs(
                                parseFloat(
                                  result.find((res) => res.id === stu.stuId)
                                    ?.fristEx || ""
                                ) -
                                  parseFloat(
                                    result.find((res) => res.id === stu.stuId)
                                      ?.secondEx || ""
                                  )
                              )}
                            </h3>
                          ) : (
                            <h3
                              style={{
                                color: "green",
                                marginLeft: "10px",
                              }}
                            >
                              {Math.abs(
                                parseFloat(
                                  result.find((res) => res.id === stu.stuId)
                                    ?.fristEx || ""
                                ) -
                                  parseFloat(
                                    result.find((res) => res.id === stu.stuId)
                                      ?.secondEx || ""
                                  )
                              )}
                            </h3>
                          )}
                        </td>
                        <td>
                          {Math.abs(
                            parseFloat(
                              result.find((res) => res.id === stu.stuId)
                                ?.fristEx || ""
                            ) -
                              parseFloat(
                                result.find((res) => res.id === stu.stuId)
                                  ?.secondEx || ""
                              )
                          ) > 14 ? (
                            <div class="flex">
                            <div>
                            <input
                            name="ThirdEx"
                            onChange={(e) =>handleInputChange(e, stu.name, stu.stuId)}
                            className="border border-gray-300  px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                            type="number"
                          />
                            </div>
                            <div>
                             <button
                              onClick={uploadMarks}
                             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
                               save
                              </button>
                             </div>
                            <div>
                              <input
                                type="text"
                                value={(result.find(res => res.id === stu.stuId)?.ThirdEx) || ''}
                                className="border border-gray-300  px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-24"
                                disabled
                              />
                            </div>
                          </div>
                          ) : (
                            <h3
                              style={{
                                color: "green",
                                marginLeft: "10px",
                              }}
                            >
                             Valid
                            </h3>
                          )}
                        </td>
                        <td>
                          {" "}
                          <input
                            name="ThirdEx"
                            value=  {Math.abs(
                              parseFloat(
                                result.find((res) => res.id === stu.stuId)
                                  ?.fristEx || ""
                              ) -
                                parseFloat(
                                  result.find((res) => res.id === stu.stuId)
                                    ?.secondEx || ""
                                )
                            ) > 14 ? (
                              (((Math.abs(
                                parseFloat(
                                  result.find((res) => res.id === stu.stuId)
                                    ?.ThirdEx || ""
                                )+(

                                  Math.abs(
                                    parseFloat(
                                      result.find((res) => res.id === stu.stuId)
                                        ?.fristEx || ""
                                    ) -
                                      parseFloat(
                                        result.find((res) => res.id === stu.stuId)
                                          ?.ThirdEx || ""
                                      )
                                  ) <

                                  Math.abs(
                                    parseFloat(
                                      result.find((res) => res.id === stu.stuId)
                                        ?.secondEx || ""
                                    ) -
                                      parseFloat(
                                        result.find((res) => res.id === stu.stuId)
                                          ?.ThirdEx || ""
                                      )
                                  )?parseFloat(
                                    result.find((res) => res.id === stu.stuId)
                                      ?.fristEx || ""
                                  ): parseFloat(
                                    result.find((res) => res.id === stu.stuId)
                                      ?.secondEx || ""
                                  )
                                  
                          
                                ) 
                              ))/2)+parseFloat(
                                result.find((res) => res.id === stu.stuId)
                                  ?.CtAtt || "")
                              )  
                            ) :(((Math.abs(
                              parseFloat(
                                result.find((res) => res.id === stu.stuId)
                                  ?.fristEx || ""
                              )+
                                parseFloat(
                                  result.find((res) => res.id === stu.stuId)
                                    ?.secondEx || ""
                                )
                            ))/2)+parseFloat(
                              result.find((res) => res.id === stu.stuId)
                                ?.CtAtt || ""))                         
                          
                          }
                            className="border-2 w-24 px-2 h-8 "
                            type="text"
                            disabled
                          />
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ):!loading&&<h1 style={{color:'red',textAlign:'center',fontSize:'40px'}}>No Result</h1>}
          {/* {search && Object.keys(error)?.length === 0 && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Body;
