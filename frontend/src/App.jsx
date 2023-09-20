import LogIn from "./authentication/admin/LogIn";
import Footer from "./common/Footer";
import NavBar from "./common/NavBar";
import Home from "./components/Home";
import Signup from "./authentication/admin/SignUp";
import AdminDashboard from "./components/AdminDashboard";
import Category from "./components/Category";
import PropertyForm from "./components/PropertyForm";

function App() {
  return (
    <>
      <NavBar />
      <PropertyForm />
      <Category />
      <Home />
      <Signup />
      <LogIn />
      <AdminDashboard />
      <Footer />
    </>
  );
}

export default App;
