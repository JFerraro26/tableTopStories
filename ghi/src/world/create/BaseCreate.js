import { useSelector } from "react-redux";
import WorldCreate from "./WorldCreate";
import CountryCreate from "./CountryCreate";
import CityCreate from "./CityCreate";
import DistrictCreate from "./DistrictCreate";
import { getNewWorldEdit } from "../../redux/selectors/selectors";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function BaseCreate() {
	const world = useSelector(getNewWorldEdit);
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

	const handleActive = (data) => {
		setActive(data);
	};

	return (
		<div className="grid grid-cols-5">
			<div className="sidebar col-start-1 col-span-1 m-4">
				<div className="grid grid-cols-1">
					{world ? (
						<div className="col-start-1 my-2">
							<button
								onClick={() => {
									setCountrySideBar("worldPage");
									setCitySideBar("worldPage");
									setPageSelect(1);
									handleActive("worldPage");
								}}
								className={`w-full truncate text-left text-2xl  font-semibold ${
									active === "worldPage"
										? "text-shadow shadow-white text-fuchsia-600"
										: "hover:text-red-500"
								}`}
							>
								{world?.name}
							</button>
						</div>
					) : (
						<div className="col-start-1">
							<h5 className="text-2xl text-center w-full trunicate font-semibold text-shadow shadow-white text-fuchsia-600">
								Create a New World
							</h5>
						</div>
					)}

					{world ? (
						<div className="col-start-1">
							<button
								onClick={() => {
									setCountrySideBar("newCountry");
									setCitySideBar("newCountry");
									setPageSelect(2);
									setCountryData(null);
									handleActive("newCountry");
								}}
								className={`w-full text-left text-xl pl-6 font-semibold ${
									active === "newCountry"
										? "text-shadow shadow-white text-fuchsia-600"
										: "hover:text-red-500"
								}`}
							>
								Create New Country
							</button>
						</div>
					) : null}
					<div className="col-start-1">
						{world?.countries?.map((country) => {
							return (
								<div key={country.pk} className="">
									<button
										onClick={() => {
											setCountrySideBar(
												`country${country.pk}`
											);
											setCitySideBar(
												`country${country.pk}`
											);
											setPageSelect(2);
											setCountryData(country);
											handleActive(
												`country${country.pk}`
											);
										}}
										className={`w-full text-left text-xl pl-6 font-semibold ${
											active === `country${country.pk}`
												? "text-shadow shadow-white text-fuchsia-600"
												: "hover:text-red-500"
										}`}
									>
										{country.name}
									</button>
									<AnimatePresence>
										{countrySideBar ===
										`country${country.pk}` ? (
											<motion.div
												key={`country${country.pk}`}
												initial={{
													height: 0,
													scale: 0,
												}}
												animate={{
													height: "auto",
													scale: 1,
												}}
												exit={{
													height: 0,
													scale: 0,
												}}
												transition={{
													duration: 0.5,
													ease: "easeOut",
												}}
											>
												<div className="col-start-1">
													<button
														key={"new-city"}
														initial={{
															height: 0,
															scale: 0,
														}}
														animate={{
															height: "auto",
															scale: 1,
														}}
														exit={{
															height: 0,
															scale: 0,
														}}
														transition={{
															duration: 0.5,
															ease: "easeOut",
														}}
														onClick={() => {
															setPageSelect(3);
															setCountryData(
																country
															);
															setCityData(null);

															setActive(
																"newCity"
															);
															setCitySideBar(
																`newCity`
															);
														}}
														className={`w-full text-left text-lg pl-10 font-semibold ${
															active === `newCity`
																? "text-shadow shadow-white text-fuchsia-600"
																: "hover:text-red-500"
														}`}
													>
														Create New City
													</button>
												</div>
												{country.cities?.map((city) => {
													return (
														<div
															key={`city${city.pk}`}
															initial={{
																height: 0,
																scale: 0,
															}}
															animate={{
																height: "auto",
																scale: 1,
															}}
															exit={{
																height: 0,
																scale: 0,
															}}
															transition={{
																duration: 0.5,
																ease: "easeOut",
															}}
															className="col-start-1"
														>
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
																	setCitySideBar(
																		`city${city.pk}`
																	);
																}}
																className={`w-full text-left text-lg pl-10 font-semibold ${
																	active ===
																	`city${city.pk}`
																		? "text-shadow shadow-white text-fuchsia-600"
																		: "hover:text-red-500"
																}`}
															>
																{city.name}
															</button>
															<AnimatePresence>
																{citySideBar ===
																`city${city.pk}` ? (
																	<motion.div
																		key={`city${city.pk}`}
																		initial={{
																			height: 0,
																			scale: 0,
																		}}
																		animate={{
																			height: "auto",
																			scale: 1,
																		}}
																		exit={{
																			height: 0,
																			scale: 0,
																		}}
																		transition={{
																			duration: 0.5,
																			ease: "easeOut",
																		}}
																	>
																		<div className="col-start-1">
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
																				className={`w-full text-left text-base pl-14 font-semibold ${
																					active ===
																					"newDistrict"
																						? "text-shadow shadow-white text-fuchsia-600"
																						: "hover:text-red-500"
																				}`}
																			>
																				Create
																				New
																				District
																			</button>
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
																								className={`w-full text-left text-base pl-14 font-semibold ${
																									active ===
																									`district${district.pk}`
																										? "text-shadow shadow-white text-fuchsia-600"
																										: "hover:text-red-500"
																								}`}
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
																	</motion.div>
																) : null}
															</AnimatePresence>
														</div>
													);
												})}
											</motion.div>
										) : null}
									</AnimatePresence>
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
