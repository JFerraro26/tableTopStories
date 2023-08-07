import { useState } from "react";
import LoginInForm from "./LogInForm";
import SignupForm from "./SignupForm";

function LandingPage() {
	const [page, setPage] = useState("login");
	return (
		<div>
			{page === "login" ? (
				<LoginInForm setPage={setPage} />
			) : (
				<SignupForm setPage={setPage} />
			)}
		</div>
	);
}

export default LandingPage;
