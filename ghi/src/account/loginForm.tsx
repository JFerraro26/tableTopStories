import { FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setAccount } from "../redux/slices/accountSlice";
import { useNavigate } from "react-router-dom";

interface LoginInFormProps {
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

function LoginInForm({ setPage }: LoginInFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const data = {
			email: email.toLocaleLowerCase(),
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
			dispatch(setAccount(token));
			navigate("/");
		} else {
			setLoginError(true);
			console.error(response);
		}
	};
	return (
		<div className="grid grid-col-5 h-full">
			<div className="mx-10 col-start-1 col-span-5 flex flex-col justify-evenly items-center  gap-4 sm:col-start-3 sm:col-span-3">
				<div className="flex flex-col mx-10 p-6 rounded-xl bg-zinc-700 items-center gap-2 shadow-lg shadow-slate-800 sm:gap-4">
					<h1 className="mb-2 font-bold text-2xl text-red-600 text-center sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
						Table Top Stories
					</h1>
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col gap-1 sm:gap-4"
					>
						<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl 2xl:text-5xl">
							<div className="flex gap-2">
								<label
									htmlFor="email"
									className="font-semibold text-white"
								>
									Email:
								</label>
								{loginError ? (
									<h5 className="text-orange-500">
										Email/Password Incorrect
									</h5>
								) : (
									<h5 className="invisible">
										Email/Password Incorrect
									</h5>
								)}
							</div>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								type="text"
								className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
								autoComplete="email"
								name="email"
								id="email"
							/>
						</div>
						<div className="flex flex-col mt-2 gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl 2xl:text-5xl">
							<label
								htmlFor="password"
								className="font-semibold text-white"
							>
								Password:
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								type="password"
								className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
								autoComplete="password"
								name="password"
								id="password"
							/>
						</div>
						<div className="flex justify-between pt-4 sm:px-2 sm:justify-around">
							<div className="flex">
								<button
									onClick={() => {
										setPage("sign-up");
									}}
									className="text-base text-blue-500 sm:text-xl md:text-3xl xl:text-4xl 2xl:text-6xl"
									type="button"
								>
									Need an Account?
								</button>
							</div>
							<button
								className="text-xl hover:text-red-300 md:text-3xl xl:text-4xl 2xl:text-6xl"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
				</div>
				<div className="w-full mx-10 mb-2 rounded-xl max-w-300 aspect-video overflow-hidden shadow-lg shadow-slate-800 lg:mx-0 2xl:max-w-4xl">
					<img
						className="object-cover w-full h-full"
						src="https://placehold.co/300x200"
					/>
				</div>
			</div>
			<div className="hidden flex-grow sm:flex sm:col-start-1 sm:col-span-2 sm:row-start-1 sm:row-span-1 sm:rounded-xl sm:m-10 sm:shadow-lg sm:shadow-slate-800 sm:overflow-hidden">
				<img
					className="object-cover w-full h-full"
					src="https://placehold.co/400x400"
				/>
			</div>
		</div>
	);
}

export default LoginInForm;
