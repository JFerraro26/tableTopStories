import { useState } from "react";
import Description from "./Description";
import NpcList from "./NpcList";

function WorldDetail({ world }) {
	const [details, setDetails] = useState("description");
	return (
		<div className="flex flex-col items-center">
			<div>
				{details === "description" ? (
					<Description description={world} />
				) : details === "npcs" ? (
					<NpcList npcs={"world npcs"} />
				) : null}
			</div>
			<div className="flex max-w-5xl text-2xl font-semibold text-blue-500">
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
				<button>Events</button>
				<button>Notes</button>
			</div>
		</div>
	);
}

export default WorldDetail;
