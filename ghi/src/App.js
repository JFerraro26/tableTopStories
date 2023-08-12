import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Mainpage";
import Nav from "./Nav/Nav";
import WorldList from "./world/details/WorldList";
import WorldPage from "./world/details/WorldPage";
import BaseCreate from "./world/create/BaseCreate";
import LandingPage from "./account/LandingPage";
import CampaignList from "./campaign/CampaignList";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="flex-grow">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/account">
						<Route path="login-signup" element={<LandingPage />} />
					</Route>
					<Route path="/worlds">
						<Route path="" element={<WorldList />} />
						<Route path="detail" element={<WorldPage />} />
						<Route path="form" element={<BaseCreate />} />
					</Route>
					<Route path="/campaign">
						<Route path="" element={<CampaignList />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
