import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccount } from "../redux/slices/accountSlice";
import { useAppDispatch } from "../redux/hooks";

interface LoginInFormProps {
	setPage: React.Dispatch<React.SetStateAction<string>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const isEmail = (email: string): boolean =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function SignUpForm({ setPage, setOpen }: LoginInFormProps) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [emailErrorUse, setEmailErrorUse] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const dispatch = useAppDispatch();
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
		<div className="flex flex-col border-2 border-red-500 p-6 rounded-xl bg-zinc-700 items-center gap-2 shadow-lg shadow-slate-800 sm:gap-4 w-72 sm:w-96">
			<form
				onSubmit={handlesubmit}
				className="w-full flex flex-col gap-1 sm:gap-4"
			>
				<button
					onClick={() => {
						setPage("login");
					}}
					className="text-base text-blue-500 sm:text-2xl md:text-3xl hover:underline"
					type="button"
				>
					Have an account?
				</button>
				<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 ">
					<div className="flex gap-2">
						<label
							htmlFor="sign-up-username"
							className="font-semibold text-white"
						>
							Username:
						</label>
						{usernameError ? (
							<h5 className="text-orange-500">Already Exists</h5>
						) : (
							<h5 className="invisible">Already Exists</h5>
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
				<div className="flex flex-col  gap-1 text-sm sm:text-xl sm:gap-2 ">
					<div className="flex gap-2">
						<label
							htmlFor="sign-up-email"
							className="font-semibold text-white"
						>
							Email:
						</label>
						{emailError ? (
							<h5 className="text-orange-500">
								enter valid email
							</h5>
						) : emailErrorUse ? (
							<h5 className="text-orange-500">Already Exists</h5>
						) : (
							<h5 className="invisible">enter valid email</h5>
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
				<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 ">
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
							<h5 className="invisible">Passwords must Match</h5>
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
				<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 ">
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
						onChange={(e) => setPasswordCheck(e.target.value)}
						id="sign-up-password-check"
						autoComplete="sign-up-password-check"
					/>
				</div>
				<button
					className="text-xl hover:underline md:text-3xl xl:text-4xl"
					type="submit"
				>
					Signup
				</button>
			</form>
		</div>
	);
}
export default SignUpForm;
