import { NavLink } from "react-router-dom";
import NavMyContent from "./NavMyContent";

function Nav() {
	return (
		<nav className="border-b-4 border-red-600">
			<div className="flex items-center w-full h-16 px-2 gap-4">
				<NavLink
					className="text-2xl font-semibold hover:text-3xl"
					to="/"
				>
					Home
				</NavLink>
				<NavMyContent />
			</div>
		</nav>
	);
}

export default Nav;
