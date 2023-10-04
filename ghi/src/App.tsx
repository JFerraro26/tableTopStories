import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./homepage";
import Nav from "./header/nav";
import Footer from "./footer/footer";
import About from "./footer/about";
import CodeOfConduct from "./footer/codeOfConduct.";
import FAQ from "./footer/faq";
import Terms from "./footer/terms";
import BaseWorldCreate from "./world/create/baseCreate";
import CampaignList from "./campaign/campainList";
import ForgotPassword from "./account/forgotPassword";

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen min-w-full bg-zinc-700 text-white flex flex-col font-serif">
				<Nav />
				<main className="flex-grow flex bg-table-dice bg-cover">
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/code-of-conduct"
							element={<CodeOfConduct />}
						/>
						<Route path="/faq" element={<FAQ />} />
						<Route path="/terms-of-service" element={<Terms />} />
						<Route path="/account">
							<Route
								path="forgot-password"
								element={<ForgotPassword />}
							/>
						</Route>
						<Route path="/world">
							<Route path="form" element={<BaseWorldCreate />} />
						</Route>
						<Route path="/campaign">
							<Route path="list" element={<CampaignList />} />
						</Route>
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
