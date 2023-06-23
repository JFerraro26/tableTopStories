import { useSelector } from "react-redux";
import WorldCreate from "./WorldCreate";
import CountryCreate from "./CountryCreate";
import CityCreate from "./CityCreate";
import { getNewWorldEdit } from "../../redux/selectors/selectors";
import { useState, useEffect } from "react";

function BaseCreate() {
	const world = useSelector(getNewWorldEdit);
	const [select, setSelect] = useState(null);
	const [pageSelect, setPageSelect] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const [cityData, setCityData] = useState(null);

	useEffect(() => {
		if (!world) {
			setPageSelect(null);
		}
	}, [world]);

	const handleSideBar = (country) => {
		setSelect(country);
	};

	const handlePageDetail = (num) => {
		setPageSelect(num);
	};

	return (
		<div className="grid grid-cols-5">
			<div className="sidebar col-start-1 col-span-1 m-4">
				<div className="grid grid-cols-1">
					{world ? (
						<div className="col-start-1">
							<button
								onClick={() => {
									handleSideBar(null);
									handlePageDetail(null);
								}}
								className="text-2xl font-semibold hover:text-red-500"
							>
								{world?.name}
							</button>
						</div>
					) : (
						<div className="col-start-1">
							<h5 className="text-2xl font-semibold">
								Create a New World
							</h5>
						</div>
					)}

					{world ? (
						<div className="col-start-1 ml-4">
							<button
								onClick={() => {
									handleSideBar(null);
									handlePageDetail(1);
									setCountryData(null);
								}}
								className="text-xl font-semibold hover:text-red-500"
							>
								Create New Country
							</button>
						</div>
					) : null}
					<div className="col-start-1 ml-4">
						{world?.countries?.map((country) => {
							return (
								<div key={country.pk} className="">
									<button
										onClick={() => {
											handleSideBar(country.pk);
											handlePageDetail(1);
											setCountryData(country);
										}}
										className="text-xl font-semibold hover:text-red-500"
									>
										{country.name}
									</button>
									{select === country.pk ? (
										<div key={country.pk} className="">
											<div className="col-start-1 ml-8">
												<button
													onClick={() => {
														handlePageDetail(2);
														setCountryData(country);
														setCityData(null);
													}}
													className="text-base font-semibold hover:text-red-500"
												>
													Create New City
												</button>
											</div>
											{country.cities?.map((city) => {
												return (
													<div
														key={city.pk}
														className="col-start-1 ml-8"
													>
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
															}}
															className="text-base font-semibold hover:text-red-500"
														>
															{city.name}
														</button>
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
				) : null}
			</div>
		</div>
	);
}
export default BaseCreate;
