import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccount } from "../redux/slices/accountSlice";
import { useAccountDispatch } from "../redux/hooks";

interface LoginInFormProps {
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

const isEmail = (email: string): boolean =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function SignUpForm({ setPage }: LoginInFormProps) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [emailErrorUse, setEmailErrorUse] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const dispatch = useAccountDispatch();
	const navigate = useNavigate();

	const handlesubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (password === passwordCheck) {
			setPasswordError(false);
			if (isEmail(email)) {
				const data = {
					email: email.toLocaleLowerCase(),
					password: password,
					username: username.toLocaleLowerCase(),
				};
				let url = `${import.meta.env.VITE_BASE_URL}/api/create-account`;
				let fetchConfig = {
					method: "post",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
				};
				const response = await fetch(url, fetchConfig);
				if (response.ok) {
					let tokenUrl = `${import.meta.env.VITE_BASE_URL}/api/login`;
					let tokenFetchConfig = {
						method: "post",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
						},
					};
					const tokenResponse = await fetch(
						tokenUrl,
						tokenFetchConfig
					);
					if (tokenResponse.ok) {
						const token = await tokenResponse.json();
						dispatch(setAccount(token));
						navigate("/");
					} else {
						console.error(tokenResponse);
					}
				} else {
					const responseError = await response.json();
					console.log(responseError.email);
					if (
						responseError.email[0] ===
							"user with this email already exists." &&
						responseError.username[0] ===
							"user with this username already exists."
					) {
						setUsernameError(true);
						setEmailErrorUse(true);
					} else if (
						responseError.email[0] ===
						"user with this email already exists."
					) {
						setUsernameError(false);
						setEmailErrorUse(true);
					} else {
						setUsernameError(true);
						setEmailErrorUse(false);
					}
				}
			} else {
				setEmailError(true);
			}
		} else {
			setPasswordError(true);
		}
	};

	return (
		<div className="grid grid-col-5 h-full">
			<div className="mx-10 col-start-1 col-span-5 flex flex-col justify-evenly items-center  gap-4 sm:col-start-3 sm:col-span-3">
				<div className="flex flex-col mx-10 p-6 rounded-xl bg-zinc-700 items-center gap-2 shadow-lg shadow-slate-800 sm:gap-4">
					<h1 className="font-bold text-2xl text-red-600 text-center sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
						Table Top Stories
					</h1>
					<form
						onSubmit={handlesubmit}
						className="w-full flex flex-col gap-1 sm:gap-4"
					>
						<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
							<div className="flex gap-2">
								<label
									htmlFor="sign-up-username"
									className="font-semibold text-white"
								>
									Username:
								</label>
								{usernameError ? (
									<h5 className="text-orange-500">
										Already Exists
									</h5>
								) : (
									<h5 className="invisible">
										Already Exists
									</h5>
								)}
							</div>
							<input
								value={username}
								name="sign-up-username"
								required
								type="text"
								className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
								onChange={(e) => setUsername(e.target.value)}
								id="sign-up-username"
								autoComplete="sign-up-username"
							/>
						</div>
						<div className="flex flex-col mt-2 gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
							<div className="flex gap-2">
								<label
									htmlFor="sign-up-email"
									className="font-semibold text-white"
								>
									Email:
								</label>
								{emailError ? (
									<h5 className="text-orange-500">
										format username@email.com
									</h5>
								) : emailErrorUse ? (
									<h5 className="text-orange-500">
										Already Exists
									</h5>
								) : (
									<h5 className="invisible">
										format username@email.com
									</h5>
								)}
							</div>
							<input
								value={email}
								name="sign-up-email"
								required
								type="text"
								className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
								onChange={(e) => setEmail(e.target.value)}
								id="sign-up-email"
								autoComplete="sign-up-email"
							/>
						</div>
						<div className="flex flex-col mt-2 gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
							<div className="flex gap-2">
								<label
									htmlFor="sign-up-password"
									className="font-semibold text-white"
								>
									Password:
								</label>
								{passwordError ? (
									<h5 className="text-orange-500">
										Passwords must Match
									</h5>
								) : (
									<h5 className="invisible">
										Passwords must Match
									</h5>
								)}
							</div>
							<input
								value={password}
								name="sign-up-password"
								required
								type="password"
								className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
								onChange={(e) => setPassword(e.target.value)}
								id="sign-up-password"
								autoComplete="sign-up-password"
							/>
						</div>
						<div className="flex flex-col mt-2 gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
							<label
								htmlFor="sign-up-password-check"
								className="font-semibold text-white"
							>
								Confirm Password:
							</label>
							<input
								value={passwordCheck}
								name="sign-up-password-check"
								required
								type="password"
								className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
								onChange={(e) =>
									setPasswordCheck(e.target.value)
								}
								id="sign-up-password-check"
								autoComplete="sign-up-password-check"
							/>
						</div>
						<div className="flex justify-between pt-4 sm:px-2 sm:justify-around">
							<button
								onClick={() => {
									setPage("login");
								}}
								className="text-base text-blue-500 sm:text-xl md:text-3xl xl:text-4xl"
								type="button"
							>
								Have an account?
							</button>
							<button
								className="text-xl hover:text-red-300 md:text-3xl xl:text-4xl"
								type="submit"
							>
								Signup
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
					src="https://placehold.co/400x200"
				/>
			</div>
		</div>
	);
}
export default SignUpForm;
