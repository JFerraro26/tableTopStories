import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	addCityToCreatedWorld,
	editCityInCreatedWorld,
	deleteCityInCreatedWorld,
} from "../../redux/slices/worldCreateSlice";
import { motion, AnimatePresence } from "framer-motion";

function CityCreate({ cityData, countryData }) {
	const dispatch = useDispatch();
	const [submitted, setSubmitted] = useState(false);
	const [cityName, setCityName] = useState("");
	const [cityPicture, setCityPicture] = useState("");
	const [cityDescription, setCityDescription] = useState("");
	const [successfulSubmit, setSuccessfulSubmit] = useState(false);
	const [successfulEdit, setSuccessfulEdit] = useState(false);

	useEffect(() => {
		if (!cityData) {
			setCityName("");
			setCityPicture("https://placehold.co/600x400");
			setCityDescription("");
			setSubmitted(false);
		} else {
			setCityName(cityData.name);
			setCityPicture(cityData.picture);
			setCityDescription(cityData.description);
			setSubmitted(true);
		}
	}, [cityData]);

	const deleteButtonClick = async (data) => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${cityName}?`
		);
		if (confirm) {
			let countryUrl = `${process.env.REACT_APP_API_HOST}/api/cities/${data.pk}`;
			let fetchConfig = {
				method: "delete",
			};
			const response = await fetch(countryUrl, fetchConfig);
			if (response.ok) {
				dispatch(
					deleteCityInCreatedWorld({
						countryPk: countryData.pk,
						cityPk: cityData.pk,
					})
				);
				setCityName("");
				setCityPicture("https://placehold.co/600x400");
				setCityDescription("");
				setSubmitted(false);
			} else {
				console.error(response);
			}
		}
	};
	useEffect(() => {
		if (successfulSubmit) {
			setTimeout(() => {
				setSuccessfulSubmit(false);
			}, 3000);
		}
	}, [successfulSubmit]);

	useEffect(() => {
		if (successfulEdit) {
			setTimeout(() => {
				setSuccessfulEdit(false);
			}, 3000);
		}
	}, [successfulEdit]);

	const handleCitySubmit = async (event) => {
		event.preventDefault();
		const data = {};
		data.name = cityName;
		data.picture = cityPicture;
		data.description = cityDescription;
		data.country = countryData.pk;
		if (submitted) {
			let cityUrlEdit = `${process.env.REACT_APP_API_HOST}/api/cities/${cityData.pk}`;
			let cityFetchConfigEdit = {
				method: "put",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const editResponse = await fetch(cityUrlEdit, cityFetchConfigEdit);
			if (editResponse.ok) {
				const editCity = await editResponse.json();
				dispatch(
					editCityInCreatedWorld({
						countryPk: countryData.pk,
						cityPk: cityData.pk,
						updatedCity: editCity,
					})
				);
				setSuccessfulEdit(true);
				setSubmitted(true);
			} else {
				console.error(editResponse);
			}
		} else {
			let cityUrl = `${process.env.REACT_APP_API_HOST}/api/cities`;
			let cityFetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(cityUrl, cityFetchConfig);
			if (response.ok) {
				const createdCity = await response.json();
				dispatch(
					addCityToCreatedWorld({
						countryPk: countryData.pk,
						newCity: createdCity,
					})
				);
				setCityName("");
				setCityDescription("");
				setCityPicture("https://placehold.co/600x400");
				setSuccessfulSubmit(true);
				setSubmitted(false);
			} else {
				console.error(response);
			}
		}
	};
	return (
		<div className="grid grid-cols-5">
			<div className="flex flex-col col-start-1 col-span-5 items-center m-5">
				<h1 className="text-4xl font-bold">City Form</h1>
				<form
					onSubmit={handleCitySubmit}
					className="flex flex-col gap-2 w-full"
				>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="city-name"
						>
							Name
						</label>
						<input
							value={cityName}
							onChange={(e) => setCityName(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							required
							type="text"
							id="city-name"
							name="city-name"
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="city-url"
						>
							Image URL
						</label>
						<input
							value={cityPicture}
							onChange={(e) => setCityPicture(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							id="city-url"
							name="city-url"
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="city-description"
						>
							Description
						</label>
						<textarea
							value={cityDescription}
							onChange={(e) => setCityDescription(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							name="city-description"
							rows="10"
						/>
					</div>
					{submitted ? (
						<div className="flex flex-row justify-around">
							<button
								type="submit"
								className="border w-1/3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black rounded-full"
							>
								Edit City
							</button>
							<button
								onClick={() => deleteButtonClick(cityData)}
								type="button"
								className="border w-1/3 border-red-500 text-red-500 hover:bg-red-500 hover:text-black rounded-full"
							>
								Delete City
							</button>
						</div>
					) : (
						<div className="flex justify-center">
							<button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black rounded-full">
								Add City
							</button>
						</div>
					)}
				</form>
				<div>
					<AnimatePresence>
						{successfulSubmit ? (
							<motion.h1
								className="m-4 rounded-xl text-white bg-green-600 text-4xl p-6"
								key="Created"
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ duration: 1 }}
								exit={{
									x: "100vw",
									transition: { duration: 2 },
								}}
							>
								City Successfully Created!!!!
							</motion.h1>
						) : null}
						{successfulEdit ? (
							<motion.h1
								className="m-4 rounded-xl text-white bg-green-600 text-4xl p-6"
								key="Created"
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ duration: 1 }}
								exit={{
									x: "100vw",
									transition: { duration: 2 },
								}}
							>
								City Edited Successfully!!!!
							</motion.h1>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

export default CityCreate;
