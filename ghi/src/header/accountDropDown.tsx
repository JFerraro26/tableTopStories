import { useState } from "react";
import { Link } from "react-router-dom";
import { clearAccount } from "../redux/slices/accountSlice";
import { useAppDispatch } from "../redux/hooks";

type AccountProps = {
	account: {
		expiry: Date;
		token: string;
		user: {
			date_joined: Date;
			email: string;
			id: string;
			is_staff: boolean;
			is_superuser: boolean;
			last_login: Date;
			username: string;
		};
	};
};

function AccountDropDown({ account }: AccountProps) {
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();

	const handleOpen = () => {
		setOpen(!open);
	};
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
	return (
		<div className="relative">
			<button
				onClick={handleOpen}
				className="relative z-10 block text-xl font-semibold sm:hover:text-red-500 sm:text-2xl md:text-3xl"
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
					<Link
						onClick={handleOpen}
						className="block px-4 py-2  hover:bg-slate-500 hover:rounded-lg"
						to="/"
					>
						Worlds
					</Link>
					<Link
						onClick={() => {
							handleOpen();
						}}
						className="block px-4 py-2 hover:bg-slate-500 hover:rounded-lg"
						to="/world/form"
					>
						New World
					</Link>
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
