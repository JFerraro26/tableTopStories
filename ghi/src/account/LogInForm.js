import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccount } from "../redux/slices/accountSlice";
import { useNavigate } from "react-router-dom";
function LoginInForm({ setPage }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlesubmit = async (e) => {
		e.preventDefault();
		const data = {};
		data.email = email;
		data.password = password;
		let url = `${process.env.REACT_APP_API_HOST}/api/login`;
		let fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const token = await response.json();
			dispatch(setAccount(token));
			navigate("/");
		} else {
			console.error(response);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center my-14 sm:grid sm:grid-cols-5">
			<h1 className="text-3xl font-bold text-white">Table Top Stories</h1>
			<form
				onSubmit={handlesubmit}
				className="flex flex-col items-center justify-center gap-4 sm:col-start-2 sm:col-span-3"
			>
				<div className="flex flex-col gap-1 w-full">
					<label className="text-sm font-semibold text-white pl-1">
						Email:
					</label>
					<input
						value={email}
						name="email"
						required
						type="text"
						className="rounded-lg text-sm px-2 py-1 bg-slate-800 border border-transparent focus:outline-none focus:border-red-600"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col mt-2 gap-1 w-full">
					<label className="text-sm font-semibold text-white pl-1">
						Password:
					</label>
					<input
						value={password}
						name="password"
						required
						type="password"
						className="rounded-lg text-sm px-2 py-1 bg-slate-800 border border-transparent focus:outline-none focus:border-red-600"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="flex w-full justify-between">
					<div className="flex">
						<button
							onClick={() => {
								setPage("sign-up");
							}}
							className="text-base border-1 rounded-2xl text-blue-500 hover:text-red-300"
							type="button"
						>
							Need an Account?
						</button>
					</div>

					<button
						className="text-xl border-1 rounded-2xl hover:text-red-300"
						type="submit"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

export default LoginInForm;
