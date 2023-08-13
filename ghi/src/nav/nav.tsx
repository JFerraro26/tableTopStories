import { NavLink } from "react-router-dom";
import { useAccountDispatch, select } from "../redux/hooks";
import { clearAccount } from "../redux/slices/accountSlice";
import { useState, useEffect } from "react";
import { selectAccount } from "../redux/selectors";

function Nav() {
	const [loggedIn, setLoggedIn] = useState(false);
	const account = select(selectAccount);
	const dispatch = useAccountDispatch();
	console.log(account);
	const logOut = async () => {
		const logOutToken = account.token;
		let url = `${import.meta.env.VITE_BASE_URL}/api/logout`;
		let fetchConfig = {
			method: "post",
			body: null,
			headers: {
				Authorization: `Token ${logOutToken}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			dispatch(clearAccount());
		} else {
			console.error(response);
		}
	};
	useEffect(() => {
		if (account.token) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, [account]);
	return (
		<nav className="border-b-4 border-red-600">
			<div className="flex items-center w-full justify-between h-16 px-4 gap-4 ">
				<NavLink
					className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
					to="/"
				>
					Home
				</NavLink>
				{loggedIn ? (
					<button
						onClick={() => {
							logOut();
						}}
						className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
					>
						Log Out
					</button>
				) : (
					<NavLink
						className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
						to="/account/login-signup"
					>
						Login/Signup
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Nav;
