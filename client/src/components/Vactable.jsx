/* eslint-disable react/prop-types */
import DataTable, { Media } from "react-data-table-component";
import { useState } from "react";
import { Modal } from "antd";
import Vacform from "./Vacform";
const Vactable = (props) => {
  const [deleteEventID, setDeleteEventId] = useState({ id: null });
  const [updateEventID, setUpdateEventId] = useState({ id: null });
  const [getEventID, setGetEventId] = useState({ id: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForm, setIsModalOpenForm] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [isvible,setVisible] = useState(false)

const handlegetButtonClick =(clickInfo, id)=>{
  setGetEventId({id:id})
  setVisible(true)
  setIsModalOpenForm(true)
}

  const handleSentDoc = (clickInfo, id) => {
    console.log("Row Id update", id);
    setUpdateEventId({id:id})
    setUpdateModalOpen(true)

  };
const handleUpdateEvent = () =>{
  updateStatus(updateEventID)
}
  async function updateStatus(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/sentdoc/updatestatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        alert("update Event Success");
        window.location.reload();
      
      } else {
        alert("update Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdateModalOpen(false)
    setIsModalOpenForm(false)
  };

  const handleDeleteButtonClick = (clickInfo, id) => {
    clickInfo.preventDefault();
    console.log("Row Id", id);
    setIsModalOpen(true);

    // Set only the 'id' property of the values object
    setDeleteEventId({ id: id });

    console.log("kkkk", { id: id });
    console.log("kkkkrrr", clickInfo);
  };
  const handleDeleteEvent = () => {
    // console.log(deleteEventID);
    deleteUserById(deleteEventID);
    console.log("deleted Id =", deleteEventID);
    setIsModalOpen(false);
    // window.location.reload();
  };
  async function deleteUserById(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/user/deleteDoc/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        alert("Delete Event Sucess");
        window.location.reload();
      } else {
        alert("Delete Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const columes = [
    {
      name: "ID",
      selector: (row) => row.id,
      hide: Media.SM,
    },
    {
      name: "วันที่ยื่น",

      selector: (row) => row.date,
    },
    {
      name: "ผู้ยื่นคำขอ",
      selector: (row) => row.username,
    },
    {
      name: "ตำแหน่ง",
      selector: (row) => row.position,
    },

    {
      name: "จำนวนวันที่ขอลา",
      selector: (row) => row.now_leave_num,
    },
    {
      name: "สถานะ",
      selector: (row) => row.status_name,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="flex flex-col space-x-4 p-1">
          {row.status_name === "รอยื่นเอกสาร" && (
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-green-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
              onClick={(e) => handleSentDoc(e, row.id)}
            >
              <p className="text-green-500">ยื่นเอกสาร</p>
            </button>
          )}

          <button
            className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-yellow-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
            type="button"
            onClick={(e) => handlegetButtonClick(e, row.id)}
          >
            <p className="text-yellow-500">view</p>
          </button>
          {row.status_name === "รอยื่นเอกสาร" && (
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-red-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
              onClick={(e) => handleDeleteButtonClick(e, row.id)}
            >
              <p className="text-red-500">Delete</p>
            </button>
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        // paddingLeft: "100px", // Adjust as needed
        paddingRight: "-100px", // Adjust as needed
        color: "green",
        marginRight: "100px",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        // paddingLeft: "1px", // Adjust as needed
        paddingRight: "1px", // Adjust as needed
        marginRight: "100px",
        fontSize: "14px",
      },
    },
  };

  return (
    <div>
      <div
        style={{
          width: "1600px",
          height: "150px",
          marginRight: "150rem",
          marginTop: "10px",
        }}
      >
        <div className="p-3 rounded-xl shadow-2xl bg-inherit">
          <div className="p-4">
            <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
              ตารางแสดงข้อมูลคำขอผู้ใช้
            </label>
          </div>
          <div>
            <DataTable
              columns={columes}
              data={props.dataVac}
              initialPageLength={4}
              persistTableHead
              customStyles={customStyles}
              pagination
            ></DataTable>
          </div>
        </div>
      </div>
      <Modal
        title="ยืนยันการลบบัญชีผู้ใช้งาน"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key="cancel"
            className="inline-block rounded bg-blue-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
            onClick={handleCancel}
          >
            Cancel
          </button>,
          <button
            key="delete"
            className="ml-2 inline-block rounded bg-red-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
            onClick={handleDeleteEvent}
          >
            Delete
          </button>,
        ]}
      >
        <div className="ml-4">
          {" "}
          ข้อมูลทั้งหมดของผู้ใช้ ID = {deleteEventID.id} จะหายไปจากระบบ{" "}
        </div>
      </Modal>
      <Modal
        title="ยืนยันการส่งเอกสาร"
        open={updateModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key="cancel"
            className="inline-block rounded bg-blue-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
            onClick={handleCancel}
          >
            Cancel
          </button>,
          <button
            key="update"
            className="ml-2 inline-block rounded bg-green-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
            onClick={handleUpdateEvent}
          >
            confirm
          </button>,
        ]}
      >
        <div className="ml-4">
          {" "}
          เมื่อยื่นเอกสาร จะไม่สามารถลบเอกสารนี้ได้ ID = {updateEventID.id} {" "}
        </div>
      </Modal>
      {isvible && (
        
        <Modal
        // style={{width:"48rem"}}
        title="แบบฟอร์มยื่นขออนุญาตลาพักร้อน"
        open={isModalOpenForm}
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
        <Vacform getEventID={getEventID} readOnly={true}/>
      </Modal>
        
      )}
    </div>
  );
};
export default Vactable;
