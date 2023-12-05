import { useEffect, useState } from "react";
import { utils as XLSXUtils, writeFile as writeExcel } from "xlsx";
import {  Modal } from "antd";
import Vactable from "./Vactable";
import Vacform from "./Vacform";
function Vacsearch() {
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [statusId, setStatusId] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [dataVac, setDataVac] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [readForm, setReadForm] = (true)
  const openform = () => {
    setIsModalOpen(true);
    // setReadForm(true)
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    if (startdate && enddate && statusId) {
      const JasonData = {
        startdate: startdate,
        enddate: enddate,
        statusId: statusId,
      };
      console.log("JJJJ", JasonData);
      getDataList(JasonData);
      console.log("dataVac in child", dataVac);
    } else {
      // Handle case when required fields are not filled
      alert("กรุณาใส่ input ให้ครับทุกช่อง ");
    }
  };
  const handleExport = () => {
    if (dataVac.length > 0) {
      const ws = XLSXUtils.json_to_sheet(dataVac);
      const wb = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(wb, ws, "VacationData");
      writeExcel(wb, "VacationData.xlsx");
    } else {
      alert("No data to export");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  async function getData(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        const formatteddata = result.results.map((event) => ({
          id: event.id,
          date: event.date,
          username: event.username,
          position: event.position,
          now_leave_num: event.now_leave_num,
          status_name: event.status_name,
        }));
        // console.log("formatteddata", formatteddata);
        setDataVac(formatteddata);
        // console.log("You results", result);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getDataList(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/searchData", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        const formattedEvents = result.results.map((event) => ({
          id: event.id,
          date: event.date,
          username: event.username,
          position: event.position,
          now_leave_num: event.now_leave_num,
          status_name: event.status_name,
          status_id:event.status_id
        }));
        setDataVac(formattedEvents);
        console.log("Data-user", result);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
        // console.log("result of Users", result);
        const data = result.results
          .filter((event) => event.id && event.name) // Filter out objects with empty or undefined values
          .map((event) => ({
            id: event.id,
            name: event.name,
          }));

        // console.log("Data", data);
        setStatusList(data);
      } else {
        alert("Get Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    getstatusList();
  });
  return (
    <div>
      <div className="grid grid-cols-3 mt-12">
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
              name="startDate"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              id="startDate"
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
              name="endDate"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              id="endDate"
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
            id="statusId"
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
            required
            style={{ width: "30rem" }}
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
      <div className="pb-8" style={{ marginLeft: "78rem", marginTop: "1rem" }}>
        <button
          onClick={handleSearch}
          style={{ backgroundColor: "#7367F0" }}
          className="inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
        >
          Search
        </button>
        <button
          onClick={handleExport}
          style={{ backgroundColor: "#FF9F43" }}
          className="ml-4   inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
        >
          Export
        </button>
        <button
          onClick={openform}
          style={{
            backgroundColor: "#28C76F",
            marginTop: "2rem",
          }}
          className="ml-12  inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
        >
          + Add Form
        </button>
      </div>
      <div>
        <Vactable dataVac={dataVac} />
      </div>
      <Modal
        // style={{width:"48rem"}}
        title="แบบฟอร์มยื่นขออนุญาตลาพักร้อน"
        open={isModalOpen}
        // width: "65rem", height: "45rem"
        width={"80rem"}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key="cancel"
            onClick={handleCancel}
            style={{ backgroundColor: "#FF9F43" }}
            className="ml-2  inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
          >
            Cancel
          </button>,
        ]}
      >
        <Vacform readOnly={false}/>
      </Modal>
     
    </div>
  );
}
export default Vacsearch;
