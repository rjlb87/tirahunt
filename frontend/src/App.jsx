import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./common/Routes";
import LogIn from "./authentication/user/LogIn";
import SignUp from "./authentication/user/SignUp";
import AdminDashboard from "./components/AdminDashboard";
import PropertyForm from "./components/PropertyForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Router />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/propertyform" element={<PropertyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
