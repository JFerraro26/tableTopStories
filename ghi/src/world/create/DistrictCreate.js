import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addDistrictInCreatedWorld,
	editDistrictInCreatedWorld,
	deleteDistrictInCreatedWorld,
} from "../../redux/slices/worldCreateSlice";
import { motion, AnimatePresence } from "framer-motion";
import { getAccountData } from "../../redux/selectors/selectors";

function DistrictCreate({ cityData, countryData, districtData }) {
	const dispatch = useDispatch();
	const [submitted, setSubmitted] = useState(false);
	const [districtName, setDistrictName] = useState("");
	const [districtPicture, setDistrictPicture] = useState("");
	const [districtDescription, setDistrictDescription] = useState("");
	const [successfulSubmit, setSuccessfulSubmit] = useState(false);
	const [successfulEdit, setSuccessfulEdit] = useState(false);
	const account = useSelector(getAccountData);

	useEffect(() => {
		if (!districtData) {
			setDistrictName("");
			setDistrictPicture("https://placehold.co/600x400");
			setDistrictDescription("");
			setSubmitted(false);
		} else {
			setDistrictName(districtData.name);
			setDistrictPicture(districtData.picture);
			setDistrictDescription(districtData.description);
			setSubmitted(true);
		}
	}, [districtData]);

	const handleDistrictSubmit = async (event) => {
		event.preventDefault();
		const data = {};
		data.name = districtName;
		data.picture = districtPicture;
		data.description = districtDescription;
		data.city = cityData.pk;
		data.created_by = account.user.id;
		if (submitted) {
			let districtUrlEdit = `${process.env.REACT_APP_API_HOST}/api/districts/update/${districtData.pk}`;
			let districtFetchConfigEdit = {
				method: "put",
				body: JSON.stringify(data),
				headers: {
					Authorization: `Token ${account.token}`,
					"Content-Type": "application/json",
				},
			};
			const editResponse = await fetch(
				districtUrlEdit,
				districtFetchConfigEdit
			);
			if (editResponse.ok) {
				const editDistrict = await editResponse.json();
				dispatch(
					editDistrictInCreatedWorld({
						countryPk: countryData.pk,
						cityPk: cityData.pk,
						districtPk: editDistrict.pk,
						updatedDistrict: editDistrict,
					})
				);
				setSuccessfulEdit(true);
				setSubmitted(true);
			} else {
				console.error(editResponse);
			}
		} else {
			let districtURl = `${process.env.REACT_APP_API_HOST}/api/districts`;
			let districtFetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					Authorization: `Token ${account.token}`,
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(districtURl, districtFetchConfig);
			if (response.ok) {
				const createdDistrict = await response.json();
				dispatch(
					addDistrictInCreatedWorld({
						countryPk: countryData.pk,
						cityPk: cityData.pk,
						newDistrict: createdDistrict,
					})
				);
				setDistrictName("");
				setDistrictPicture("https://placehold.co/600x400");
				setDistrictDescription("");
				setSuccessfulSubmit(true);
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

	const deleteButtonClick = async (data) => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${districtName}?`
		);
		if (confirm) {
			let countryUrl = `${process.env.REACT_APP_API_HOST}/api/districts/${data.pk}`;
			let fetchConfig = {
				headers: { Authorization: `Token ${account.token}` },
				method: "delete",
			};
			const response = await fetch(countryUrl, fetchConfig);
			if (response.ok) {
				dispatch(
					deleteDistrictInCreatedWorld({
						countryPk: countryData.pk,
						cityPk: cityData.pk,
						districtPk: data.pk,
					})
				);
				setDistrictName("");
				setDistrictPicture("https://placehold.co/600x400");
				setDistrictDescription("");
				setSubmitted(false);
			} else {
				console.error(response);
			}
		}
	};

	return (
		<div className="grid grid-cols-5">
			<div className="flex flex-col col-start-1 col-span-5 items-center m-5">
				<h1 className="text-4xl font-bold">District Form</h1>
				<form
					onSubmit={handleDistrictSubmit}
					className="flex flex-col gap-2 w-full"
				>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="district-name"
						>
							Name
						</label>
						<input
							value={districtName}
							onChange={(e) => setDistrictName(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							required
							type="text"
							id="district-name"
							name="district-name"
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
							value={districtPicture}
							onChange={(e) => setDistrictPicture(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							id="district-url"
							name="district-url"
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="district-description"
						>
							Description
						</label>
						<textarea
							value={districtDescription}
							onChange={(e) =>
								setDistrictDescription(e.target.value)
							}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							name="district-description"
							rows="10"
						/>
					</div>
					{submitted ? (
						<div className="flex flex-row justify-around">
							<button
								type="submit"
								className="border w-1/4 border-orange-600 text-orange-600 hover:border-orange-400 hover:text-orange-400 rounded-full"
							>
								Edit District
							</button>
							<button
								onClick={() => deleteButtonClick(districtData)}
								type="button"
								className="border w-1/4 border-red-600 text-red-600 hover:border-red-400 hover:text-red-400 rounded-full"
							>
								Delete District
							</button>
						</div>
					) : (
						<div className="flex justify-center">
							<button className="border w-1/4 border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 rounded-full">
								Add District
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

export default DistrictCreate;
