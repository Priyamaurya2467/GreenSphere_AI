import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import DashboardPage from "./app/dashboard/page"
import AQIPage from "./app/aqi/page";
import EcoSnapPage from "./app/ecosnap/page";

import CarbonPage from "./app/carbon/page";
export default function App() {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/aqi" element={<AQIPage />} />    
				<Route path="/ecosnap" element={<EcoSnapPage />} />

				<Route path="/carbon" element={<CarbonPage />} />
			</Routes>

			<Footer />
		</>
	);
}