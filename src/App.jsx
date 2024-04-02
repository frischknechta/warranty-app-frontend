import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./routes/Register/Register";
import Check from "./routes/Check/Check";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Router>
  );
}

export default App;
