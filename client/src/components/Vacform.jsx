import { useEffect, useState } from "react";
const Vacform = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // setAccumulated_leave(data.get("accumulated_leave"))
    const datalist = {
      username: data.get("username"),
      position: data.get("position"),
      workgroup: data.get("workgroup"),
      accumulated_leave: data.get("accumulated_leave"),
      total_date_num: data.get("total_date_num"),
      passed_leave_num: data.get("passed_leave_num"),
      now_leave_num: data.get("now_leave_num"),
      total_date: data.get("total_date"),
      con_name: data.get("con_name"),
      con_tel: data.get("con_tel"),
    };
    console.log("Datalist", datalist);
    addData(datalist);
  };

  // Add to vaccation form
  async function addData(JasonData) {
    try {
      const response = await fetch("http://localhost:3030/insertvac", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData),
      });

      const result = await response.json();
      if (result.status === "ok") {
        alert("Add Event Sucess");
        window.location.reload();
      } else {
        alert("Add Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const onAccchange = (e) => {
    e.preventDefault();
    const data = new FormData(e.target.form);
    console.log("onAccchange", data.get("accumulated_leave"));
    setTotal_date_num(parseInt(data.get("accumulated_leave")) + 10);
  };
  const [total_date_num, setTotal_date_num] = useState(0);
  const [total_date, setTotal_date] = useState(0);
  const [passed_leave_num, setPassed_leave_num] = useState(0);
  const [now_leave_num, setNow_leave_num] = useState(0);
  const oninchange = () => {
    setTotal_date(parseInt(passed_leave_num) + parseInt(now_leave_num));
  };
  useEffect(() => {
    oninchange();
  }, [passed_leave_num, now_leave_num]);
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen sm:justify-center sm:pt-0 bg-inherit">
        <div className=" px-12 py-4 mt-6 overflow-hidden bg-white-500 shadow-md  sm:rounded-lg">
          <form
            onSubmit={onSubmit}
            style={{ width: "65rem", height: "45rem" }}
            className=" sm:justify-center"
          >
            <div>
              <label className="text-xl">แบบฟอร์มยื่นขออนุญาตลาพักร้อน</label>
            </div>
            <div
              className="grid grid-cols-2 mt-12 items-center ml-12"
              style={{ marginLeft: "4rem" }}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  ชื่อผู้ขอ
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "25rem" }}
                  />
                </div>
              </div>
              <div className="ml-4">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  ตำแหน่ง
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "25rem" }}
                  />
                </div>
              </div>
            </div>
            <div
              className=" mt-12 items-center ml-12"
              style={{ marginLeft: "4rem" }}
            >
              <div>
                <label
                  htmlFor="workgroup"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  สังกัดกลุ่มงาน
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="workgroup"
                    id="workgroup"
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "56.5rem" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="grid grid-cols-5 mt-12 items-center ml-12"
              style={{ marginLeft: "4rem" }}
            >
              <div>
                <label
                  htmlFor="accumulated_leave"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  วันลาสะสม(วัน)
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="accumulated_leave"
                    id="accumulated_leave"
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "5rem" }}
                    onChange={onAccchange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  รวมวันพักผ่อนประจำปี(วัน)
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="total_date_num"
                    id="total_date_num"
                    value={total_date_num}
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "5rem" }}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  ลามาแล้ว(วัน)
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="passed_leave_num"
                    id="passed_leave_num"
                    value={passed_leave_num}
                    onChange={(e) => setPassed_leave_num(e.target.value)}
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "5rem" }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  ลาครั้งนี้(วัน)
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="now_leave_num"
                    id="now_leave_num"
                    onChange={(e) => setNow_leave_num(e.target.value)}
                    value={now_leave_num}
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "5rem" }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  รวม(วัน)
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="total_date"
                    id="total_date"
                    value={total_date}
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "5rem" }}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div
              className="grid grid-cols-2 mt-12 items-center ml-12"
              style={{ marginLeft: "4rem" }}
            >
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  ระหว่างไม่อยู่ติดต่อ
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="con_name"
                    id="con_name"
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "25rem" }}
                  />
                </div>
              </div>
              <div className="ml-4">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  โทร
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="con_tel"
                    id="con_tel"
                    className="block  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    style={{ width: "25rem" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-end mt-12 mr-12"
              style={{ marginTop: "8rem", marginRight: "4rem" }}
            >
              {/* <button
              onClick={handleCancel}
                style={{ backgroundColor: "#FF9F43" }}
                className="inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false "
              >
                cancle
              </button> */}
              <button
                type="submit"
                style={{ backgroundColor: "rgb(136, 146, 227)" }}
                className="ml-2  inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false "
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Vacform;
