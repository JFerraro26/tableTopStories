import { useState } from "react";
import LoginInForm from "../account/loginForm";
import SignUpForm from "../account/signUpForm.";

function LoginPopUp() {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState("login");

	return (
		<div className="">
			<button
				onClick={() => {
					setOpen(true);
				}}
				className="relative text-xl font-semibold sm:hover:text-red-600 sm:text-2xl md:text-3xl"
			>
				Login
			</button>
			{open ? (
				<button
					onClick={() => setOpen(false)}
					className="fixed z-10 h-full w-full cursor-default inset-0 bg-black opacity-50"
				></button>
			) : null}
			{open ? (
				<div className="fixed z-20 right-0 top-14 mr-1">
					{page === "login" ? (
						<LoginInForm setPage={setPage} setOpen={setOpen} />
					) : (
						<SignUpForm setPage={setPage} setOpen={setOpen} />
					)}
				</div>
			) : null}
		</div>
	);
}

export default LoginPopUp;
