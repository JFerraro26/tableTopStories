import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./homepage";
import Nav from "./nav/nav";
import LandingPage from "./account/landingPage";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/account">
						<Route path="login-signup" element={<LandingPage />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
