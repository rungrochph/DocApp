/* eslint-disable react/prop-types */
import DataTable, { Media } from "react-data-table-component";
import { useState } from "react";
import { Modal } from "antd";

const Vactable = (props) => {
  const [deleteEventID, setDeleteEventId] = useState({ id: null });

  // const [editUserID, seteditUserId] = useState({ id: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
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
        <div className="flex space-x-2">
          <button
            className="inline-block rounded bg-red-500 px-2 pb-0 pt-0  font-small uppercase leading-normal text-white-500 shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
            type="button"
            onClick={(e) => handleDeleteButtonClick(e, row.id)}
          >
            <p className="bg-white-500">Delete</p>
          </button>
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
    </div>
  );
};
export default Vactable;
