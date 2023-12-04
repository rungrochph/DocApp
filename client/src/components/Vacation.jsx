import Navbar from "./Navbar";
import Vacform from "./Vacform";
import { useState } from "react";
import { Modal } from "antd";
import Vactable from "./Vactable";
import Vacsearch from "./Vacsearch";
const useVacation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openform = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginBottom: "20rem" }}>
      <Navbar />

      <div className="p-10 mt-12 mx-12 bg-white-500 rounded-2xl shadow-2xl">
        <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
          ยื่นใบลาพักร้อนออนไลน์
          <label style={{ marginLeft: "10rem" }} className="ml-12">
            --------------------------------------------------------------------------------------------------------------------------------
          </label>
        </label>
      </div>
      <div className="p-10 mt-12 mx-12 bg-inherit ">
        <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
          card Status
          <label style={{ marginLeft: "10rem" }} className="ml-12">
            --------------------------------------------------------------------------------------------------------------------------------
          </label>
        </label>
      </div>

      <div className="">
        <div className="mt-2 mx-12 bg-inherit ">
          <label
            className="text-2xl"
            style={{ color: "rgb(136, 146, 227)", marginLeft: "7rem" }}
          >
            ค้นหาข้อมูล
          </label>

          <div style={{ marginLeft: "10rem" }}>
            <Vacsearch />
          </div>

          <div className="" style={{ marginLeft: "95rem",marginTop:"1rem"}}>
            <button
              onClick={openform}
              style={{ backgroundColor: "#7367F0" }}
              className="inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
            >
              Search
            </button>
            <button
              onClick={openform}
              style={{ backgroundColor: "#FF9F43" }}
              className="ml-4   inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
            >
              Export
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={openform}
          style={{
            backgroundColor: "#28C76F",
            marginLeft: "102rem",
            marginTop: "2rem",
          }}
          className="ml-12  inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false"
        >
          + Add Form
        </button>
        <Vactable />
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
        <Vacform />
      </Modal>
    </div>
  );
};
export default useVacation;
