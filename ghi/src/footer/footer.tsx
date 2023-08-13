import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="w-full border-t-4 border-red-500">
			<div className="flex justify-evenly">
				<Link to="/about">About</Link>
				<Link to="/faq">FAQ</Link>
				<Link to="/terms-of-service">Terms</Link>
				<Link to="/code-of-conduct">Code of Conduct</Link>
			</div>
		</footer>
	);
}
export default Footer;
