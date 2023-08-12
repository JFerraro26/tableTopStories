import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccountData } from "../redux/selectors/selectors";
import AccountDropDown from "./AccountDropDown";

import { useState, useEffect } from "react";

function Nav() {
	const account = useSelector(getAccountData);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (account.token) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, [account]);

	return (
		<nav className="border-b-4 border-red-600 w-full">
			<div className="flex items-center w-full justify-between px-4 pt-2 pb-1">
				<NavLink
					className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
					to="/"
				>
					Home
				</NavLink>
				<NavLink
					className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
					to="/campaign"
				>
					Join
				</NavLink>

				<NavLink
					className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
					to="/worlds/form"
				>
					Create
				</NavLink>

				{loggedIn ? (
					<AccountDropDown account={account} />
				) : (
					<NavLink
						className="text-xl font-semibold sm:hover:text-red-300 sm:text-2xl md:text-3xl"
						to="/account/login-signup"
					>
						Login
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Nav;
