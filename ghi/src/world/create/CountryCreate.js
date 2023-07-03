import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	editCountryInCreatedWorld,
	addCountryToCreatedWorld,
	deleteCountryInCreatedWorld,
} from "../../redux/slices/worldCreateSlice";
import { getNewWorldEdit } from "../../redux/selectors/selectors";
import { motion, AnimatePresence } from "framer-motion";

function CountryCreate({ countryData }) {
	const world = useSelector(getNewWorldEdit);
	const [countryName, setCountryName] = useState("");
	const [countryImgURL, setCountryImgURL] = useState("");
	const [countryDescription, setCountryDescription] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [successfulSubmit, setSuccessfulSubmit] = useState(false);
	const [successfulEdit, setSuccessfulEdit] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (countryData) {
			setCountryName(countryData.name);
			setCountryImgURL(countryData.picture);
			setCountryDescription(countryData.description);
			setSubmitted(true);
		} else {
			setCountryName("");
			setCountryImgURL("https://placehold.co/600x400");
			setCountryDescription("");
			setSubmitted(false);
		}
	}, [countryData]);

	const deleteButtonClick = async (countryData) => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${countryName}?`
		);
		if (confirm) {
			let countryUrl = `${process.env.REACT_APP_API_HOST}/api/countries/${countryData.pk}`;
			let fetchConfig = {
				method: "delete",
			};
			const response = await fetch(countryUrl, fetchConfig);
			if (response.ok) {
				dispatch(deleteCountryInCreatedWorld(countryData.pk));
				setCountryName("");
				setCountryImgURL("https://placehold.co/600x400");
				setCountryDescription("");
				setSubmitted(false);
			} else {
				console.error(response);
			}
		}
	};

	const handleCountrySubmit = async (event) => {
		event.preventDefault();
		const data = {};
		data.name = countryName;
		data.picture = countryImgURL;
		data.description = countryDescription;
		data.world = world.pk;
		if (submitted) {
			let countryUrlUpdate = `${process.env.REACT_APP_API_HOST}/api/countries/${countryData.pk}`;
			let countryFetchConfigUpdate = {
				method: "put",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const updateResponse = await fetch(
				countryUrlUpdate,
				countryFetchConfigUpdate
			);
			if (updateResponse.ok) {
				const updatedCountry = await updateResponse.json();
				updatedCountry.cities = countryData.cities;
				dispatch(
					editCountryInCreatedWorld({
						countryPk: updatedCountry.pk,
						updatedCountry: updatedCountry,
					})
				);
				setSuccessfulEdit(true);
			}
		} else {
			let countryUrl = `${process.env.REACT_APP_API_HOST}/api/countries`;
			let countryFetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(countryUrl, countryFetchConfig);
			if (response.ok) {
				const createdCountry = await response.json();
				dispatch(addCountryToCreatedWorld({ country: createdCountry }));
				setCountryName("");
				setCountryImgURL("https://placehold.co/600x400");
				setCountryDescription("");
				setSuccessfulSubmit(true);
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

	return (
		<div className="grid grid-cols-5">
			<div className="m-5 flex flex-col col-start-1 col-span-5 items-center">
				<h1 className="text-4xl font-bold">Country Form</h1>
				<form
					onSubmit={handleCountrySubmit}
					className="flex flex-col gap-2 w-full"
				>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="country-name"
						>
							Name
						</label>
						<input
							value={countryName}
							onChange={(e) => setCountryName(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							required
							type="text"
							id="country-name"
							name="country-name"
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="country-url"
						>
							Image URL
						</label>
						<input
							value={countryImgURL}
							onChange={(e) => setCountryImgURL(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							id="country-url"
							name="country-url"
							placeholder=" Country Url..."
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="country-description"
						>
							Description
						</label>
						<textarea
							value={countryDescription}
							onChange={(e) =>
								setCountryDescription(e.target.value)
							}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							name="country-description"
							rows="10"
						/>
					</div>

					{submitted ? (
						<div className="my-2 flex flex-row justify-around">
							<button
								type="submit"
								className="border w-1/3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black rounded-full"
							>
								Edit Country
							</button>
							<button
								onClick={() => deleteButtonClick(countryData)}
								type="button"
								className="border w-1/3 border-red-500 text-red-500 hover:bg-red-500 hover:text-black rounded-full"
							>
								Delete Country
							</button>
						</div>
					) : (
						<div className="my-2 flex justify-center">
							<button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black rounded-full">
								Add Country
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
								Country Successfully Created!!!!
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
								Country Edited Successfully!!!!
							</motion.h1>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

export default CountryCreate;
