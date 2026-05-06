// import Footer from ""
import { Outlet, useLocation } from "react-router-dom";
import Client from "../Clients/Client";
import Footer from "../Footer/Footer";
import General from "../General/General";
import hospital from ".././assets/hospitalimg.jpg"
import DisplayImg from "../General/DisplayImg";
function Dashboard() {
  let pathname = useLocation()
  console.log(pathname);

  return (
    <>
      <Client></Client>
      <General />
      <Outlet />
      <DisplayImg />
      <Footer />
    </>
  );
}

export default Dashboard;