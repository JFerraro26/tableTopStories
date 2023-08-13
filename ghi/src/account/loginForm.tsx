import { FormEvent, useState } from "react";
import { useAccountDispatch } from "../redux/hooks";
import { setAccount } from "../redux/slices/accountSlice";
import { useNavigate } from "react-router-dom";

function LoginInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useAccountDispatch();
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const data = {
			email: email,
			password: password,
		};
		let url = `${import.meta.env.VITE_BASE_URL}/api/login`;
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
			console.log(token);
			dispatch(setAccount(token));
			navigate("/");
		} else {
			console.error(response);
		}
	};
	return (
		<div className="grid grid-cols-5">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col mt-10 col-start-2 col-span-3 gap-4 text-red-600"
			>
				<div className="flex flex-col space-y-1">
					<label className="text-sm font-semibold text-white">
						Email:
					</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						type="text"
						className="rounded-lg text-sm px-2 py-1 bg-slate-800 border border-transparent focus:outline-none focus:border-red-600"
						autoComplete="email"
					/>
				</div>
				<div className="flex flex-col mt-2 space-y-1">
					<label className="text-sm font-semibold text-white">
						Password:
					</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						type="password"
						className="rounded-lg text-sm px-2 py-1 bg-slate-800 border border-transparent focus:outline-none focus:border-red-600"
						autoComplete="password"
					/>
				</div>
				<div className="flex justify-between">
					<div className="flex">
						<button
							// onClick={() => {
							// 	setPage("sign-up");
							// }}
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
