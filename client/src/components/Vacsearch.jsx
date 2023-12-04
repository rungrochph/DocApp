import { useEffect, useState } from "react";

const Vacsearch = () => {
    const [statusId, setstatusId] = useState([]);
    const [statusList, setStatusList] = useState([]);


    async function getstatusList(JasonData) {
        try {
          const response = await fetch("http://localhost:3030/calender/getstatus", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(JasonData),
          });
          const result = await response.json();
          if (result.status === "ok") {
            console.log("result of Users", result);
            const data = result.results
              .filter((event) => event.id && event.name) // Filter out objects with empty or undefined values
              .map((event) => ({
                id: event.id,
                name: event.name,
              }));
    
            console.log("Data", data);
            setStatusList(data);
          } else {
            alert("Get Event failed");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      useEffect(()=>{
        getstatusList();
    })
  return (
    <div>
      <div
        className="grid grid-cols-3 mt-12"
      >
        <div>
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            จากวันที่
          </label>
          <div className="flex flex-col ">
            <input
              type="date"
              name="start_date"
              id="start_date"
              className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              style={{ width: "24rem" }}
            />
          </div>
        </div>
        <div className="ml-4">
          <label
            htmlFor="end_date"
            className="block text-sm font-medium text-gray-700 undefined"
          >
            ชื่อผู้ขอ
          </label>
          <div className="flex flex-col">
            <input
              type="date"
              name="end_date"
              id="end_date"
              className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              style={{ width: "24rem" }}
            />
          </div>
        </div>
        <div className="ml-4">
          <label className="block text-sm font-medium text-gray-700 undefined">
            สถานะ
          </label>
          <select
            className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            id="userNameId"
            value={statusId}
            onChange={(e) => setstatusId(e.target.value)}
            required
            style={{ width: "27rem" }}
          >
            <option value={""} key={999}>
              --กรุณาเลือกสถานะ--
            </option>
            {statusList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Vacsearch;
