import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import {auth} from "./config/firebase"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  

  return (
      <div className="font-[Inter]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;
