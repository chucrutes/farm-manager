import "./index.css";
import Home from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/layout/root-layout";
import TypesPage from "./pages/types";
import RegistersPage from "./pages/registers";
import CreateRegistersPage from "./pages/registers/create-register";
import RegisterDetailPage from "./pages/registers/[id]";
import SignUp from "./pages/sign-up";

function App() {
  return (
    <RootLayout>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/registers" element={<RegistersPage />} />
          <Route path="/register/new" element={<CreateRegistersPage />} />
          <Route path="/register/:id" element={<RegisterDetailPage />} />
        </Routes>
      </Router>
    </RootLayout>
  );
}

export default App;
