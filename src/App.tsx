import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="font-[Inter]">
        <Login />
        <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;