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
	const [citySelect, setCitySelect] = useState("worldPage");
	const [pageSelect, setPageSelect] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const [cityData, setCityData] = useState(null);
	const [districtData, setDistrictData] = useState(null);
	const [active, setActive] = useState("worldPage");

	useEffect(() => {
		if (!world) {
			setPageSelect(null);
		}
	}, [world]);

	const handlePageDetail = (num) => {
		setPageSelect(num);
	};

	const handleActive = (data) => {
		setActive(data);
	};

	return (
		<div className="grid grid-cols-5">
			<div className="sidebar col-start-1 col-span-1 m-4">
				<div className="grid grid-cols-1">
					{world ? (
						<div className="col-start-1">
							{active === "worldPage" ? (
								<button
									onClick={() => {
										setCountrySideBar("worldPage");
										handlePageDetail(null);
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
										handlePageDetail(null);
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
							<h5 className="text-2xl font-semibold bg-red-600 text-black rounded-md">
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
										handlePageDetail(1);
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
										handlePageDetail(1);
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
												handlePageDetail(1);
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
												handlePageDetail(1);
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
															handlePageDetail(2);
															setCountryData(
																country
															);
															setCityData(null);
															setActive(
																"newCity"
															);
														}}
														className="text-base text-left pl-8 font-semibold w-full bg-red-600 text-black rounded-md"
													>
														Create New City
													</button>
												) : (
													<button
														onClick={() => {
															handlePageDetail(2);
															setCountryData(
																country
															);
															setCityData(null);
															setActive(
																"newCity"
															);
														}}
														className="text-base pl-8 text-left w-full font-semibold hover:text-red-500"
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
																	handlePageDetail(
																		2
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
																	setCitySelect(
																		`city${city.pk}`
																	);
																}}
																className="text-base pl-8 text-left font-semibold w-full bg-red-600 text-black rounded-md"
															>
																{city.name}
															</button>
														) : (
															<button
																onClick={() => {
																	handlePageDetail(
																		2
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
																	setCitySelect(
																		`city${city.pk}`
																	);
																}}
																className="text-base pl-8 text-left font-semibold w-full hover:text-red-500"
															>
																{city.name}
															</button>
														)}
														{citySelect ===
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
																				handlePageDetail(
																					3
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
																				handlePageDetail(
																					3
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
				{pageSelect === null ? (
					<WorldCreate />
				) : pageSelect === 1 ? (
					<CountryCreate countryData={countryData} />
				) : pageSelect === 2 ? (
					<CityCreate cityData={cityData} countryData={countryData} />
				) : pageSelect === 3 ? (
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
