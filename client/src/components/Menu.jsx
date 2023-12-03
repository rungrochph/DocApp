import Navbar from "./Navbar";
import logo from "../assets/images/vacation.png";
import logo1 from "../assets/images/a.png";
const onClick = () =>{
    window.location = "./login";
}
const Menu = () => {
  return (
    <div>
      <Navbar />
      <div className="p-12">
        <div className="p-10 mt-12 mx-12 bg-white-500 rounded-2xl shadow-2xl">
          <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
            Application Menu
            <label style={{ marginLeft: "10rem" }} className="ml-12">
              ------------------------------------------------------------------------------------------------------------------------------------------
            </label>
          </label>
        </div>
        <div className="flex flex-row mt-12" style={{ marginTop: "4rem",marginBottom:"50rem" }}>
          <button onClick={onClick}>
            <img
              src={logo}
              style={{ width: "200px", height: "130px", marginLeft: "10rem" }}
              className="ml-12 bg-white-700 rounded-2xl shadow-2xl "
            />
          </button>

          <button>
            <img
              src={logo1}
              style={{ width: "200px", height: "130px", marginLeft: "2rem" }}
              className=" bg-white-700 rounded-2xl shadow-2xl hover:bg-purple-600"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Menu;
