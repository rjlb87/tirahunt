import LogIn from "./authentication/admin/LogIn";
import Footer from "./common/Footer";
import NavBar from "./common/NavBar";
import Home from "./components/Home";
import Signup from "./authentication/admin/SignUp";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Signup />
      <LogIn />
      <Footer />
    </>
  );
}

export default App;
