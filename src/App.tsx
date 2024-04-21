import "./index.css";
import Home from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";

function App() {
	return (
		<RootLayout>
			<Router>
				<Routes>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</RootLayout>
	);
}

export default App;
