import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccount } from "../redux/slices/accountSlice";
import { useNavigate } from "react-router-dom";

function SignUpForm({ setPage }) {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordCheck, setPasswordCheck] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlesubmit = async (e) => {
		e.preventDefault();
		if (password === passwordCheck) {
			const data = {};
			data.email = email;
			data.password = password;
			data.username = username;
			let url = `${process.env.REACT_APP_API_HOST}/api/create-account`;
			let fetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(url, fetchConfig);
			if (response.ok) {
				let tokenUrl = `${process.env.REACT_APP_API_HOST}/api/login`;
				let tokenFetchConfig = {
					method: "post",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
				};
				const tokenResponse = await fetch(tokenUrl, tokenFetchConfig);
				if (tokenResponse.ok) {
					const token = await tokenResponse.json();
					dispatch(setAccount(token));
					navigate("/");
				} else {
					console.error(tokenResponse);
				}
			} else {
				console.error(response);
			}
		} else {
			console.error("Passwords Do not match");
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
						Username:
					</label>
					<input
						value={username}
						name="username"
						required
						type="text"
						className=""
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
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
				<div className="flex flex-col mt-2 space-y-1">
					<label className="text-sm font-semibold text-white">
						Confirm Password:
					</label>
					<input
						value={passwordCheck}
						name="password-check"
						required
						type="password-check"
						className=""
						onChange={(e) => setPasswordCheck(e.target.value)}
					/>
				</div>
				<div className="flex justify-between">
					<button
						onClick={() => {
							setPage("login");
						}}
						className="text-xl border-1 rounded-2xl hover:text-red-300"
						type="button"
					>
						Login
					</button>
					<button
						className="text-xl border-1 rounded-2xl hover:text-red-300"
						type="submit"
					>
						Signup
					</button>
				</div>
			</form>
		</div>
	);
}
export default SignUpForm;
