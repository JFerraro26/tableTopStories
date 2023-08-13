import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./homepage";
import Nav from "./header/nav";
import Footer from "./footer/footer";
import LandingPage from "./account/landingPage";
import About from "./footer/about";
import CodeOfConduct from "./footer/codeOfConduct.";
import FAQ from "./footer/faq";
import Terms from "./footer/terms";

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen min-w-full bg-zinc-500 text-white flex flex-col font-serif">
				<Nav />
				<main className="flex-grow flex">
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
								path="login-signup"
								element={<LandingPage />}
							/>
						</Route>
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
