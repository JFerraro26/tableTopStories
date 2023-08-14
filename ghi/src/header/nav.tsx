import { Link } from "react-router-dom";
import { select } from "../redux/hooks";
import { useState, useEffect } from "react";
import { selectAccount } from "../redux/selectors";
import AccountDropDown from "./accountDropDown";

function header() {
	const [loggedIn, setLoggedIn] = useState(false);
	const account = select(selectAccount);
	useEffect(() => {
		if (account.token) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, [account]);
	return (
		<header className="border-b-4 border-red-600">
			<nav className="flex items-center w-full justify-between h-16 px-4 gap-4 ">
				<Link
					className="text-xl font-semibold sm:hover:text-red-600 sm:text-2xl md:text-3xl"
					to="/"
				>
					Home
				</Link>
				{loggedIn ? (
					<AccountDropDown account={account} />
				) : (
					<Link
						className="text-xl font-semibold sm:hover:text-red-600 sm:text-2xl md:text-3xl"
						to="/account/login-signup"
					>
						Login
					</Link>
				)}
			</nav>
		</header>
	);
}

export default header;
