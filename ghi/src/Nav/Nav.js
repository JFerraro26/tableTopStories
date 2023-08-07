import { NavLink } from "react-router-dom";
import NavMyContent from "./NavMyContent";
import { useSelector, useDispatch } from "react-redux";
import { getAccountData } from "../redux/selectors/selectors";
import { clearAccount } from "../redux/slices/accountSlice";
import { useState, useEffect } from "react";

function Nav() {
	const account = useSelector(getAccountData);
	const [loggedIn, setLoggedIn] = useState(false);
	const dispatch = useDispatch();
	const logOut = async () => {
		const logOutToken = account.token;
		let url = `${process.env.REACT_APP_API_HOST}/api/logout`;
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
					className="text-2xl font-semibold hover:text-3xl"
					to="/"
				>
					Home
				</NavLink>
				<NavMyContent />
				{loggedIn ? (
					<button
						onClick={() => {
							logOut();
						}}
						className="text-2xl font-semibold hover:text-3xl"
					>
						Log Out
					</button>
				) : (
					<NavLink
						className="text-2xl font-semibold hover:text-3xl"
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
