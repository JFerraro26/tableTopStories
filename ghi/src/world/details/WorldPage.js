import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorldDetail from "./WorldDetail";
import CountryDetail from "./CountryDetail";
import CityDetail from "./CityDetail";
import DistrictDetail from "./DistrictDetail";

function WorldPage() {
	let { state } = useLocation();
	const worldPk = state.world.pk;
	const [world, setWorld] = useState(null);
	const [countrySideBar, setCountrySideBar] = useState("worldPage");
	const [citySideBar, setcitySideBar] = useState("worldPage");
	const [pageSelect, setPageSelect] = useState(1);
	const [countryData, setCountryData] = useState(null);
	const [cityData, setCityData] = useState(null);
	const [districtData, setDistrictData] = useState(null);
	const [active, setActive] = useState("worldPage");

	useEffect(() => {
		const fetchWorldData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/api/worlds/${worldPk}`
			);
			if (response.ok) {
				const worldData = await response.json();
				setWorld(worldData);
			} else {
				console.error(response);
			}
		};
		fetchWorldData();
	}, [worldPk]);

	const handleActive = (data) => {
		setActive(data);
	};
	return (
		<div className="grid grid-cols-5">
			<div className="sidebar col-start-1 col-span-1 m-4">
				<div className="grid grid-cols-1">
					<div className="col-start-1 my-2">
						{active === "worldPage" ? (
							<button
								onClick={() => {
									setCountrySideBar("worldPage");
									setPageSelect(1);
									handleActive("worldPage");
								}}
								className="w-full text-left text-2xl bg-red-600 rounded-md text-black font-semibold"
							>
								{world?.name}
							</button>
						) : (
							<button
								onClick={() => {
									setCountrySideBar("worldPage");
									setPageSelect(1);
									handleActive("worldPage");
								}}
								className="w-full text-left text-2xl font-semibold hover:text-red-500"
							>
								{world?.name}
							</button>
						)}
					</div>
					<div className="col-start-1">
						{world?.countries?.map((country) => {
							return (
								<div key={`country${country.pk}`}>
									{active === `country${country.pk}` ? (
										<button
											onClick={() => {
												setCountrySideBar(
													`country${country.pk}`
												);
												setPageSelect(2);
												setCountryData(country);
												handleActive(
													`country${country.pk}`
												);
											}}
											className="text-xl font-semibold text-left pl-6 w-full bg-red-600 text-black rounded-md"
										>
											{country.name}
										</button>
									) : (
										<button
											onClick={() => {
												setCountrySideBar(
													`country${country.pk}`
												);
												setPageSelect(2);
												setCountryData(country);
												handleActive(
													`country${country.pk}`
												);
											}}
											className="text-xl text-left pl-6 font-semibold w-full hover:text-red-500"
										>
											{country.name}
										</button>
									)}
									{countrySideBar === `country${country.pk}`
										? country.cities?.map((city) => {
												return (
													<div
														key={`city${city.pk}`}
														className="col-start-1"
													>
														{active ===
														`city${city.pk}` ? (
															<button
																onClick={() => {
																	setPageSelect(
																		3
																	);
																	setCountryData(
																		country
																	);
																	setCityData(
																		city
																	);
																	handleActive(
																		`city${city.pk}`
																	);
																	setcitySideBar(
																		`city${city.pk}`
																	);
																}}
																className="text-lg pl-10 text-left font-semibold w-full bg-red-600 text-black rounded-md"
															>
																{city.name}
															</button>
														) : (
															<button
																onClick={() => {
																	setPageSelect(
																		3
																	);
																	setCountryData(
																		country
																	);
																	setCityData(
																		city
																	);
																	handleActive(
																		`city${city.pk}`
																	);
																	setcitySideBar(
																		`city${city.pk}`
																	);
																}}
																className="text-lg pl-10 text-left font-semibold w-full hover:text-red-500"
															>
																{city.name}
															</button>
														)}
														{citySideBar ===
														`city${city.pk}` ? (
															<div
																key={`city${city.pk}`}
															>
																{city.districts?.map(
																	(
																		district
																	) => {
																		return (
																			<div
																				key={
																					district.pk
																				}
																				className="col-start-1"
																			>
																				{active ===
																				`district${district.pk}` ? (
																					<button
																						onClick={() => {
																							setPageSelect(
																								4
																							);
																							setDistrictData(
																								district
																							);
																							handleActive(
																								`district${district.pk}`
																							);
																						}}
																						className="text-base pl-14 text-left font-semibold w-full bg-red-600 text-black rounded-md"
																					>
																						{
																							district.name
																						}
																					</button>
																				) : (
																					<button
																						onClick={() => {
																							setPageSelect(
																								4
																							);
																							setDistrictData(
																								district
																							);
																							handleActive(
																								`district${district.pk}`
																							);
																						}}
																						className="text-base pl-14 text-left font-semibold w-full hover:text-red-500"
																					>
																						{
																							district.name
																						}
																					</button>
																				)}
																			</div>
																		);
																	}
																)}
															</div>
														) : null}
													</div>
												);
										  })
										: null}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="content col-start-2 col-span-4">
				{pageSelect === 1 ? (
					<WorldDetail world={world} />
				) : pageSelect === 2 ? (
					<CountryDetail country={countryData} />
				) : pageSelect === 3 ? (
					<CityDetail city={cityData} />
				) : pageSelect === 4 ? (
					<DistrictDetail district={districtData} />
				) : null}
			</div>
		</div>
	);
}

export default WorldPage;
