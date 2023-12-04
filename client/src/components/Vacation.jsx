import Navbar from "./Navbar";
// import Vacform from "./Vacform";
import { useState, useEffect } from "react";
// import { Modal } from "antd";

import Vacsearch from "./Vacsearch";
import Statuscard from "./Statuscard";
const useVacation = () => {

  const [dataVac, setDataVac] = useState();
  useEffect(() => {
    console.log("dataVac in main", dataVac); // Log the updated dataVac
  }, [dataVac]);

  const handleChildStateChange = (formattedEvents) => {
    // Update parent component state with the new state from the child
    setDataVac(formattedEvents);
    // console.log("dataVac in main", dataVac); // Don't log here, it might be outdated
  };
  return (
    <div style={{ marginBottom: "20rem" ,paddingBottom:"10rem"}}>
      <Navbar />

      <div className="p-10 mt-12 mx-12 bg-white-500 rounded-2xl shadow-2xl">
        <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
          ยื่นใบลาพักร้อนออนไลน์
          <label style={{ marginLeft: "10rem" }} className="ml-12">
            --------------------------------------------------------------------------------------------------------------------------------
          </label>
        </label>
      </div>
      <div className="pt-12 my-12 mx-8 bg-inheric">
        <label
          className="text-2xl p-2 mt-2 mx-12 bg-inheric"
          style={{
            color: "rgb(136, 146, 227)",
            marginLeft: "7rem",
            paddingRight: "90rem",
          }}
        >
          แถบแสดงสถานะ
        </label>
        <div
          className="mr-4"
          style={{ marginRight: "200px", marginLeft: "20rem" }}
        >
          <Statuscard />
        </div>
      </div>

      <div className="">
        <div className="pt-12 mt-4 mx-12 bg-inherit ">
          <label
            className="text-2xl p-2 mt-2 mx-12 bg-white-500 "
            style={{
              color: "rgb(136, 146, 227)",
              marginLeft: "7rem",
              paddingRight: "92rem",
            }}
          >
            ค้นหาข้อมูล
          </label>

          <div style={{ marginLeft: "10rem" }}>
            <Vacsearch onStateChange={handleChildStateChange} />
          </div>
        </div>
      </div>
      <div>
      
        
      </div>
      
    </div>
  );
};
export default useVacation;
