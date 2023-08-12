import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCreatedWorld } from "../redux/slices/worldCreateSlice";
import { clearAccount } from "../redux/slices/accountSlice";

function AccountDropDown({ account }) {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const handleOpen = () => {
		setOpen(!open);
	};
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
	return (
		<div className="relative">
			<button
				onClick={handleOpen}
				className="relative z-10 block text-2xl font-semibold hover:text-red-300"
				id="my-content-button"
			>
				Profile
			</button>
			{open ? (
				<button
					onClick={handleOpen}
					className="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
				></button>
			) : null}
			{open ? (
				<div className="absolute top-auto w-48 mt-2 py-2 bg-slate-900 rounded-lg shadow-xl">
					<NavLink
						onClick={handleOpen}
						className="block px-4 py-2  hover:bg-slate-500 hover:rounded-lg"
						to="/worlds"
					>
						Worlds
					</NavLink>
					<NavLink
						onClick={() => {
							handleOpen();
							dispatch(clearCreatedWorld());
						}}
						className="block px-4 py-2 hover:bg-slate-500 hover:rounded-lg"
						to="/worlds/form"
					>
						New World
					</NavLink>
					<button
						onClick={() => {
							logOut();
						}}
						className="block px-4 py-2 hover:bg-slate-500 hover:rounded-lg"
					>
						Log Out
					</button>
				</div>
			) : null}
		</div>
	);
}
export default AccountDropDown;
