import LogIn from "./authentication/admin/LogIn";
import Footer from "./common/Footer";
import NavBar from "./common/NavBar";
import Home from "./components/Home";
import Signup from "./authentication/admin/SignUp";
import Admin from "./components/AdminDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Signup />
      <LogIn />
      {/* <AdminDashboard /> */}
      <Footer />
    </>
  );
}

export default App;
