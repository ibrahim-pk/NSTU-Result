import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, deleteSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";
import axios from "axios";
const CurriculmnBody = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [checkedValue, setCheckedValue] = useState([]);

  const [batchCurriculmn, setBatchCurriculmn] = useState(false);

  const [allCurriculmn, setAllCurriculmn] = useState([]);

  const [value, setValue] = useState({
    department: "",
    year: "",
    term: "",
    degree: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors)?.length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setBatchCurriculmn(false);
    setError({});
    dispatch(getSubject(value));
  };
  const subjects = useSelector((state) => state.admin.subjects.result);
  console.log(subjects?.length);
  useEffect(() => {
    if (store.admin.subjectDeleted) {
      setValue({ department: "", year: "", term: "", degree: "" });
      setSearch(false);
      setLoading(false);
      dispatch({ type: DELETE_SUBJECT, payload: false });
    }
  }, [store.admin.subjectDeleted]);

  useEffect(() => {
    if (subjects?.length !== 0 || subjects?.length === 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

let sub11
let sub12
let sub21
let sub22
let sub31
let sub32
let sub41
let sub42



  const handleBatchCurriculmn = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/admin/getallsubject"
    );
    console.log(data?.subject?.length);
    setAllCurriculmn(data?.subject);
    setBatchCurriculmn(true);
    
  };

  if(allCurriculmn.length>0){
    sub11 = allCurriculmn.filter((res) => res?.year === "1" && res?.term === "1");
    sub12 = allCurriculmn.filter((res) => res?.year === "1" && res?.term === "2");
    sub21 = allCurriculmn.filter((res) => res?.year === "2" && res?.term === "1");
    sub22 = allCurriculmn.filter((res) => res?.year === "2" && res?.term === "2");
    sub31 = allCurriculmn.filter((res) => res?.year === "3" && res?.term === "1");
    sub32 = allCurriculmn.filter((res) => res?.year === "3" && res?.term === "2");
    sub41 = allCurriculmn.filter((res) => res?.year === "4" && res?.term === "1");
    sub42 = allCurriculmn.filter((res) => res?.year === "4" && res?.term === "2");
    
    console.log(sub11);
  }

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <h1 onClick={handleBatchCurriculmn} className="btn btn-sm">
            2018-2019
          </h1>
          <h1 onClick={handleBatchCurriculmn} className="btn btn-sm">2019-2020</h1>
          <h1 onClick={handleBatchCurriculmn} className="btn btn-sm">2020-2021</h1>
          <h1 onClick={handleBatchCurriculmn} className="btn btn-sm">2021-2022</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}
          >
            <label htmlFor="degree">Degree</label>
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

            <label htmlFor="year">Term</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.term}
              onChange={(e) => setValue({ ...value, term: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>

            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="col-span-3 p-2 mr-6 overflow-x-auto overflow-y-auto">
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
              {(error.noSubjectError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noSubjectError || error.backendError}
                </p>
              )}
            </div>
            {search &&
              !loading &&
              !batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-y-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects?.length > 0 ? (
                        subjects?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
               {/* 1-1 */}
          
          {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:1 Term:1</b></h1>
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub11?.length > 0 ? (
                        sub11?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
           
           {/* 1-2 */}
              {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:1 Term:2</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub12?.length > 0 ? (
                        sub12?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 2-1 */}
              {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:2 Term:1</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub21?.length > 0 ? (
                        sub21?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

               {/* 2-2 */}
               {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:2 Term:2</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub22?.length > 0 ? (
                        sub22?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

                {/* 3-1 */}
                {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:3 Term:1</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub31?.length > 0 ? (
                        sub31?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

                {/* 3-2 */}
                {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:3 Term:2</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub32?.length > 0 ? (
                        sub32?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

               {/* 4-1 */}
               {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:4 Term:1</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub41?.length > 0 ? (
                        sub41?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {batchCurriculmn &&
              Object.keys(error)?.length === 0 && (
                <div className="overflow-x-auto overflow-y-auto">
                  <h1><b>Year:4 Term:2</b></h1>
                   
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Lecture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub42?.length > 0 ? (
                        sub42?.map((adm, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{adm.subjectCode}</td>
                            <td>{adm.subjectName}</td>
                            <td>{adm.totalLectures}</td>
                          </tr>
                        ))
                      ) : (
                        <h1>No Subject Found</h1>
                      )}
                    </tbody>
                  </table>
                </div>
              )}


          
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default CurriculmnBody;
