import { Link } from "react-router-dom";
function Homepage() {
	return (
		<div className="flex flex-col justify-evenly items-center w-full">
			<div className="flex flex-col rounded-xl bg-zinc-700 p-2 mx-2 text-6xl font-bold text-center sm:text-8xl sm:gap-4 md:p-8 lg:flex-row">
				<h1>Table</h1>
				<h1>Top</h1>
				<h1>Stories</h1>
			</div>

			<p className="text-2xl font-semibold text-center rounded-xl bg-zinc-700 p-2 mx-2 sm:text-3xl lg:p-4 lg:text-4xl">
				A Place to{" "}
				<Link
					className="text-blue-500 hover:underline"
					to="/world/form"
				>
					Create
				</Link>{" "}
				or{" "}
				<Link
					className="text-blue-500 hover:underline"
					to="/campaign/list"
				>
					Join
				</Link>{" "}
				an Epic Campaign
			</p>
		</div>
	);
}

export default Homepage;
