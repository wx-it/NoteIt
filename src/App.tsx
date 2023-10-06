import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./pages/Loading";
import { motion } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(false);

  //set loading page
  function loaderTimer() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
  useEffect(() => {
    loaderTimer();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="font-[Poppins]">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 2,
            },
          }}
        >
          <Loading />
        </motion.div>
      ) : (
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
