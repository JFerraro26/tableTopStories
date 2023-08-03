import { useState } from "react";
import Description from "./Description";
import NpcList from "./NpcList";
import Events from "./Events";
import Notes from "./Notes";

function CountryDetail({ country }) {
	const [details, setDetails] = useState("description");
	return (
		<div className="flex flex-col items-center min-h-full my-10">
			<h1 className="mt-4 text-center text-5xl font-bold">
				{country?.name}
			</h1>
			<h2 className="text-center pt-1 text-xl font-semibold  text-white">
				Country
			</h2>
			<div className="flex py-4 px-6 justify-between w-full max-w-5xl text-2xl font-semibold text-blue-500">
				<button
					onClick={() => {
						setDetails("description");
					}}
				>
					Description
				</button>
				<button
					onClick={() => {
						setDetails("npcs");
					}}
				>
					NPCs
				</button>
				<button
					onClick={() => {
						setDetails("events");
					}}
				>
					Events
				</button>
				<button
					onClick={() => {
						setDetails("notes");
					}}
				>
					Notes
				</button>
			</div>
			<div className="flex-grow text-white text-lg">
				{details === "description" ? (
					<Description description={country} />
				) : details === "npcs" ? (
					<NpcList npcs={country.name} />
				) : details === "events" ? (
					<Events events={country.name} />
				) : details === "notes" ? (
					<Notes notes={country.name} />
				) : null}
			</div>
		</div>
	);
}

export default CountryDetail;
