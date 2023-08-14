import { useState, useEffect } from "react";
import { select } from "../../redux/hooks";
import { selectCreateWorld, selectAccount } from "../../redux/selectors";
import { motion, AnimatePresence } from "framer-motion";
import CityForm from "./cityForm";
import DistrictForm from "./districtForm";
import CountryForm from "./countryForm";
import WorldForm from "./worldForm";

function BaseWorldCreate() {
	const world = select(selectCreateWorld);
	const account = select(selectAccount);
	const [countrySideBar, setCountrySideBar] = useState("worldPage");
	const [citySideBar, setCitySideBar] = useState("worldPage");
	const [pageSelect, setPageSelect] = useState(1);
	const [countryData, setCountryData] = useState(null);
	const [cityData, setCityData] = useState(null);
	const [districtData, setDistrictData] = useState(null);
	const [active, setActive] = useState("worldPage");

	useEffect(() => {
		if (!world) {
			setPageSelect(1);
		}
	}, [world]);

	return (
		<div className="flex-grow flex flex-col w-full">
			{world.name ? (
				<div className="sidebar mt-3 flex flex-col w-full">
					<button className="text-lg">{world?.name}</button>
					<button className="text-lg invisible">
						World Name Here
					</button>
					<button className="text-lg invisible">
						World Name Here
					</button>
					<button className="text-lg invisible">
						World Name Here
					</button>
				</div>
			) : (
				<div className="flex flex-col mt-3 w-full">
					<h5 className="text-lg text-center trunicate font-semibold rounded-lg bg-zinc-700 shadow-lg shadow-slate-800">
						Create a New World
					</h5>
					<h5 className="text-lg invisible">Create a New World</h5>
					<h5 className="text-lg invisible">Create a New World</h5>
					<h5 className="text-lg invisible">Create a New World</h5>
				</div>
			)}

			<div className="forms flex-grow flex mt-2 w-full">
				{pageSelect === 1 ? (
					<WorldForm account={account} />
				) : pageSelect === 2 ? (
					<CountryForm />
				) : pageSelect === 3 ? (
					<CityForm />
				) : (
					<DistrictForm />
				)}
			</div>
		</div>
	);
}

export default BaseWorldCreate;
