import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccount } from "../redux/slices/accountSlice";

function LoginInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

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
		} else {
			console.error(response);
		}
	};

	return (
		<div className="grid grid-cols-5">
			<form
				onSubmit={handlesubmit}
				className="flex flex-col mt-10 col-start-2 col-span-3 gap-4"
			>
				<div className="flex flex-col space-y-1">
					<label className="text-sm font-semibold text-white">
						Email:
					</label>
					<input
						value={email}
						name="email"
						required
						type="text"
						className=""
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col mt-2 space-y-1">
					<label className="text-sm font-semibold text-white">
						Password:
					</label>
					<input
						value={password}
						name="password"
						required
						type="password"
						className=""
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="flex justify-end">
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
