import { useSelector } from "react-redux";
import WorldCreate from "./WorldCreate";
import CountryCreate from "./CountryCreate";
import CityCreate from "./CityCreate";
import DistrictCreate from "./DistrictCreate";
import { getNewWorldEdit } from "../../redux/selectors/selectors";
import { useState, useEffect } from "react";

function BaseCreate() {
	const world = useSelector(getNewWorldEdit);
	const [countrySideBar, setCountrySideBar] = useState("worldPage");
	const [citySideBar, setcitySideBar] = useState("worldPage");
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

	const handleActive = (data) => {
		setActive(data);
	};

	return (
		<div className="grid grid-cols-5">
			<div className="sidebar col-start-1 col-span-1 m-4">
				<div className="grid grid-cols-1">
					{world ? (
						<div className="col-start-1 my-2">
							{active === "worldPage" ? (
								<button
									onClick={() => {
										setCountrySideBar("worldPage");
										setPageSelect(1);
										handleActive("worldPage");
									}}
									className="w-full pl-1 text-left text-2xl bg-red-600 rounded-md text-black font-semibold"
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
									className="w-full pl-1 text-left text-2xl font-semibold hover:text-red-500"
								>
									{world?.name}
								</button>
							)}
						</div>
					) : (
						<div className="col-start-1">
							<h5 className="shadow-lg shadow-red-700 text-2xl font-semibold bg-red-600 text-black rounded-md">
								Create a New World
							</h5>
						</div>
					)}

					{world ? (
						<div className="col-start-1">
							{active === "newCountry" ? (
								<button
									onClick={() => {
										setCountrySideBar("newCountry");
										setPageSelect(2);
										setCountryData(null);
										handleActive("newCountry");
									}}
									className="text-left pl-4 text-xl w-full font-semibold bg-red-600 text-black rounded-md"
								>
									Create New Country
								</button>
							) : (
								<button
									onClick={() => {
										setCountrySideBar("newCountry");
										setPageSelect(2);
										setCountryData(null);
										handleActive("newCountry");
									}}
									className="pl-4 text-xl text-left w-full font-semibold hover:text-red-500"
								>
									Create New Country
								</button>
							)}
						</div>
					) : null}
					<div className="col-start-1">
						{world?.countries?.map((country) => {
							return (
								<div key={country.pk} className="">
									{active === `country${country.pk}` ? (
										<button
											onClick={() => {
												setCountrySideBar(country.pk);
												setPageSelect(2);
												setCountryData(country);
												handleActive(
													`country${country.pk}`
												);
											}}
											className="text-xl font-semibold text-left pl-4 w-full bg-red-600 text-black rounded-md"
										>
											{country.name}
										</button>
									) : (
										<button
											onClick={() => {
												setCountrySideBar(country.pk);
												setPageSelect(2);
												setCountryData(country);
												handleActive(
													`country${country.pk}`
												);
											}}
											className="text-xl text-left pl-4 font-semibold w-full hover:text-red-500"
										>
											{country.name}
										</button>
									)}
									{countrySideBar === country.pk ? (
										<div key={country.pk} className="">
											<div className="col-start-1">
												{active === "newCity" ? (
													<button
														onClick={() => {
															setPageSelect(3);
															setCountryData(
																country
															);
															setCityData(null);
															setActive(
																"newCity"
															);
														}}
														className="text-lg text-left pl-8 font-semibold w-full bg-red-600 text-black rounded-md"
													>
														Create New City
													</button>
												) : (
													<button
														onClick={() => {
															setPageSelect(3);
															setCountryData(
																country
															);
															setCityData(null);
															setActive(
																"newCity"
															);
														}}
														className="text-lg pl-8 text-left w-full font-semibold hover:text-red-500"
													>
														Create New City
													</button>
												)}
											</div>
											{country.cities?.map((city) => {
												return (
													<div
														key={city.pk}
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
																className="text-lg pl-8 text-left font-semibold w-full bg-red-600 text-black rounded-md"
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
																className="text-lg pl-8 text-left font-semibold w-full hover:text-red-500"
															>
																{city.name}
															</button>
														)}
														{citySideBar ===
														`city${city.pk}` ? (
															<div
																key={city.pk}
																className=""
															>
																<div className="col-start-1">
																	{active ===
																	"newDistrict" ? (
																		<button
																			onClick={() => {
																				setPageSelect(
																					4
																				);
																				setCountryData(
																					country
																				);
																				setCityData(
																					city
																				);
																				setDistrictData(
																					null
																				);
																				setActive(
																					"newDistrict"
																				);
																			}}
																			className="text-base text-left pl-12 font-semibold w-full bg-red-600 text-black rounded-md"
																		>
																			Create
																			New
																			District
																		</button>
																	) : (
																		<button
																			onClick={() => {
																				setPageSelect(
																					4
																				);
																				setCountryData(
																					country
																				);
																				setCityData(
																					city
																				);
																				setDistrictData(
																					null
																				);
																				setActive(
																					"newDistrict"
																				);
																			}}
																			className="text-base pl-12 text-left w-full font-semibold hover:text-red-500"
																		>
																			Create
																			New
																			District
																		</button>
																	)}
																</div>
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
																						className="text-base pl-12 text-left font-semibold w-full bg-red-600 text-black rounded-md"
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
																						className="text-base pl-12 text-left font-semibold w-full hover:text-red-500"
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
											})}
										</div>
									) : null}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="content col-start-2 col-span-4">
				{pageSelect === 1 ? (
					<WorldCreate />
				) : pageSelect === 2 ? (
					<CountryCreate countryData={countryData} />
				) : pageSelect === 3 ? (
					<CityCreate cityData={cityData} countryData={countryData} />
				) : pageSelect === 4 ? (
					<DistrictCreate
						cityData={cityData}
						countryData={countryData}
						districtData={districtData}
					/>
				) : null}
			</div>
		</div>
	);
}
export default BaseCreate;
