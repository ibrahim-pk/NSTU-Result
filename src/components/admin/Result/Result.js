// ResultTable.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateGradePoint } from "../../resultCalculation/ResultGrade";
const results = [
  {
    courseCode: "CS101",
    credit: 3,
    courseTitle: "Introduction to Computer Science",
    tgpa: 3.5,
    grade: "A",
  },
  {
    courseCode: "MATH201",
    credit: 2,
    courseTitle: "Calculus",
    tgpa: 3.7,
    grade: "A",
  },
  // Add more results as needed
];

const ResultTable = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/faculty/getresult/${id}`
      );
      setLoading(false);
      console.log("Rslt:", data);
      setStudent(data?.result);
      setResult(data?.rslt);
    };
    fetchData();
  }, []);

  let s11;
  let s12;
  let s21;
  let s22;
  let s31;
  let s32;
  let s41;
  let s42;


  let c11;
  let c12;
  let c21;
  let c22;
  let c31;
  let c32;
  let c41;
  let c42;

  let uc11;
  let uc12;
  let uc21;
  let uc22;
  let uc31;
  let uc32;
  let uc41;
  let uc42;

  let t11;
  let t12;
  let t21;
  let t22;
  let t31;
  let t32;
  let t41;
  let t42;

  if (result?.length > 0) {
    s11 = result.filter((res) => res?.year === "1" && res?.term === "1");
    s12 = result.filter((res) => res?.year === "1" && res?.term === "2");
    s21 = result.filter((res) => res?.year === "2" && res?.term === "1");
    s22 = result.filter((res) => res?.year === "2" && res?.term === "2");
    s31 = result.filter((res) => res?.year === "3" && res?.term === "1");
    s32 = result.filter((res) => res?.year === "3" && res?.term === "2");
    s41 = result.filter((res) => res?.year === "4" && res?.term === "1");
    s42 = result.filter((res) => res?.year === "4" && res?.term === "2");

    c11 = result.reduce((i,c) =>c.year==="1"&&c.term==="1"&&i+parseFloat(c?.credit),0);
    c12 = result.reduce((i,c) =>c.year==="1"&&c.term==="2"&&i+parseFloat(c?.credit),0);
    c21 = result.reduce((i,c) =>c.year==="2"&&c.term==="1"&&i+parseFloat(c?.credit),0);
    c22 = result.reduce((i,c) =>c.year==="2"&&c.term==="2"&&i+parseFloat(c?.credit),0);
    c31 = result.reduce((i,c) =>c.year==="3"&&c.term==="1"&&i+parseFloat(c?.credit),0);
    c32 = result.reduce((i,c) =>c.year==="3"&&c.term==="2"&&i+parseFloat(c?.credit),0);
    c41 = result.reduce((i,c) =>c.year==="4"&&c.term==="1"&&i+parseFloat(c?.credit),0);
    c42 = result.reduce((i,c) =>c.year==="4"&&c.term==="2"&&i+parseFloat(c?.credit),0);


   
    uc11 = result.reduce((i,result) =>(
      result.year==="1"&&result.term==="1"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);
    uc12 = result.reduce((i,result) =>(
      result.year==="1"&&result.term==="2"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);

    uc21 = result.reduce((i,result) =>(
      result.year==="2"&&result.term==="1"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);

    uc22 = result.reduce((i,result) =>(
      result.year==="2"&&result.term==="2"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);

    uc31 = result.reduce((i,result) =>(
      result.year==="3"&&result.term==="1"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);

    uc32 = result.reduce((i,result) =>(
      result.year==="3"&&result.term==="2"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ,result?.credit).allCredit,0);


    uc41 = result.reduce((i,result) =>(
      result.year==="4"&&result.term==="1"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);

    uc42 = result.reduce((i,result) =>(
      result.year==="4"&&result.term==="2"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ).point,0);





    t32 = result.reduce((i,result) =>(
      result.year==="3"&&result.term==="2"&&
      result.id===student[0].stuId)&&i+calculateGradePoint(
      Math.abs(
        parseFloat(result?.fristEx || 0) -
          parseFloat(result.secondEx || 0)
      ) > 14
        ? Math.abs(
            parseFloat(result?.ThirdEx || 0) +
              (Math.abs(
                parseFloat(result?.fristEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              ) <
              Math.abs(
                parseFloat(result?.secondEx || 0) -
                  parseFloat(result?.ThirdEx || 0)
              )
                ? parseFloat(result?.fristEx || 0)
                : parseFloat(result?.secondEx || 0))
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
        : Math.abs(
            parseFloat(result?.fristEx || 0) +
              parseFloat(result?.secondEx || 0)
          ) /
            2 +
            parseFloat(result?.CtAtt || 0)
    ,result?.credit).tgpa,0);
    



  }
  
  return (
    <div className="max-w-screen-lg mx-auto result-table-container">
      <div>
        <div className="">
          <h1 className="text-2xl my-1  font-bold">
            Noakhali Science & Technology University
          </h1>
          <h1 className="text-md my-1  font-bold">
            Sonapur,Noakhali-3814,Bangladesh
          </h1>
          <hr className="text-2xl border"></hr>
          <h1 className="text-xl my-1  font-bold">
            Computer Science &Telecommunication Engineering
          </h1>
          <h1 className="text-md my-1  font-bold">
            B.s.c Engg. in Computer Science &Telecommunication Engineering
          </h1>
          <h1 className="text-md my-1  font-bold">Name:{student[0]?.name}</h1>
          <h1 className="text-md my-1  font-bold">
            StudentId:{student[0]?.stuId}
          </h1>
          <h1 className="text-md my-1  font-bold">
            Session:{student[0]?.year}
          </h1>
        </div>
        {/* result table start */}
        <div className="overflow-x-auto my-4">
          <h1 className="my-2 font-bold">Year:1,Term:1</h1>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">
                  Course Code
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Course Title
                </th>
                <th className="border border-gray-400 px-4 py-2">Credit</th>
                <th className="border border-gray-400 px-4 py-2">GP</th>
                <th className="border border-gray-400 px-4 py-2">Grade</th>
                <th className="border border-gray-400 px-4 py-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {s11?.map((result, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-400 px-4 py-2">
                    {result.code}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {result.subTitle}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {result.credit}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {
                      calculateGradePoint(
                        Math.abs(
                          parseFloat(result?.fristEx || 0) -
                            parseFloat(result.secondEx || 0)
                        ) > 14
                          ? Math.abs(
                              parseFloat(result?.ThirdEx || 0) +
                                (Math.abs(
                                  parseFloat(result?.fristEx || 0) -
                                    parseFloat(result?.ThirdEx || 0)
                                ) <
                                Math.abs(
                                  parseFloat(result?.secondEx || 0) -
                                    parseFloat(result?.ThirdEx || 0)
                                )
                                  ? parseFloat(result?.fristEx || 0)
                                  : parseFloat(result?.secondEx || 0))
                            ) /
                              2 +
                              parseFloat(result?.CtAtt || 0)
                          : Math.abs(
                              parseFloat(result?.fristEx || 0) +
                                parseFloat(result?.secondEx || 0)
                            ) /
                              2 +
                              parseFloat(result?.CtAtt || 0)
                      ).point
                    }
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                  {
                      calculateGradePoint(
                        Math.abs(
                          parseFloat(result?.fristEx || 0) -
                            parseFloat(result.secondEx || 0)
                        ) > 14
                          ? Math.abs(
                              parseFloat(result?.ThirdEx || 0) +
                                (Math.abs(
                                  parseFloat(result?.fristEx || 0) -
                                    parseFloat(result?.ThirdEx || 0)
                                ) <
                                Math.abs(
                                  parseFloat(result?.secondEx || 0) -
                                    parseFloat(result?.ThirdEx || 0)
                                )
                                  ? parseFloat(result?.fristEx || 0)
                                  : parseFloat(result?.secondEx || 0))
                            ) /
                              2 +
                              parseFloat(result?.CtAtt || 0)
                          : Math.abs(
                              parseFloat(result?.fristEx || 0) +
                                parseFloat(result?.secondEx || 0)
                            ) /
                              2 +
                              parseFloat(result?.CtAtt || 0)
                      ).grade
                    }
                  </td>




                  <td className="border border-gray-400 px-4 py-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="my-2 font-bold">TGPA:{t11},CGPA:3.22</h1>
          <h1 className="my-2 font-bold">Credit Earned:{uc11} in {c11}</h1>
        </div>
        {/* result table end */}
      </div>
    </div>
  );
};

export default ResultTable;
