import { useState } from "react";
import LoginInForm from "./loginForm";

function LandingPage() {
	const [page, setPage] = useState("login");
	return (
		<div className="flex-grow">
			{page === "login" ? <LoginInForm setPage={setPage} /> : null}
		</div>
	);
}

export default LandingPage;
