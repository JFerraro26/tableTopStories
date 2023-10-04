import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="w-full border-t-4 border-red-500 h-16">
			<div className="flex justify-evenly items-center h-full text-sm font-semibold sm:text-2xl md:text-3xl">
				<Link className="sm:hover:text-red-600" to="/about">
					About
				</Link>
				<Link className="sm:hover:text-red-600" to="/faq">
					FAQ
				</Link>
				<Link className="sm:hover:text-red-600" to="/terms-of-service">
					Terms
				</Link>
				<Link className="sm:hover:text-red-600" to="/code-of-conduct">
					Code of Conduct
				</Link>
			</div>
		</footer>
	);
}
export default Footer;
