import { FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setAccount } from "../redux/slices/accountSlice";
import { Link } from "react-router-dom";

interface LoginInFormProps {
	setPage: React.Dispatch<React.SetStateAction<string>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const isEmail = (email: string): boolean =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function LoginInForm({ setPage, setOpen }: LoginInFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const dispatch = useAppDispatch();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (isEmail(email)) {
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
				setOpen(false);
			} else {
				const responseError = await response.json();
				console.log(responseError);
				if (
					responseError.non_field_errors[0] ===
					"Email does not exist."
				) {
					setEmailError(true);
					setInvalidEmail(false);
					setPasswordError(false);
				} else if (
					responseError.non_field_errors[0] === "Wrong Credentials."
				) {
					setInvalidEmail(false);
					setEmailError(false);
					setPasswordError(true);
				}
			}
		} else {
			setInvalidEmail(true);
		}
	};
	return (
		<div className="flex flex-col border-2 border-red-500 p-6 rounded-xl bg-zinc-700 items-center gap-2 shadow-lg shadow-slate-800 sm:gap-4 w-72 sm:w-96">
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col gap-1 sm:gap-4"
			>
				<button
					onClick={() => {
						setPage("sign-up");
					}}
					className="text-base text-blue-500 sm:text-2xl md:text-3xl hover:underline"
					type="button"
				>
					Need an Account?
				</button>
				<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2">
					<div className="flex gap-2">
						<label
							htmlFor="email"
							className="font-semibold text-white"
						>
							Email:
						</label>
						{emailError ? (
							<h5 className="text-orange-500">
								Email Does Not Exist
							</h5>
						) : invalidEmail ? (
							<h5 className="text-orange-500">
								Invalid Email Format
							</h5>
						) : (
							<h5 className="invisible">Email Does Not Exist</h5>
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
				<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2">
					<div className="flex gap-2">
						<label
							htmlFor="password"
							className="font-semibold text-white"
						>
							Password:
						</label>
						{passwordError ? (
							<h5 className="text-orange-500">
								Password Incorrect
							</h5>
						) : (
							<h5 className="invisible">Password Incorrect</h5>
						)}
					</div>
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
				<div className="flex justify-between items-center pt-4 sm:px-2 sm:justify-around">
					<Link
						onClick={() => {
							setOpen(false);
						}}
						className="text-base text-blue-500 sm:text-xl md:text-2xl hover:underline"
						to="account/forgot-password"
					>
						Forgot Password?
					</Link>
					<button
						className="text-xl hover:underline md:text-3xl"
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
