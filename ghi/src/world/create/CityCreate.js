import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	addCityToCreatedWorld,
	editCityInCreatedWorld,
	deleteCityInCreatedWorld,
} from "../../redux/slices/worldCreateSlice";

function CityCreate({ cityData, countryData }) {
	const dispatch = useDispatch();
	const [submitted, setSubmitted] = useState(false);
	const [cityName, setCityName] = useState("");
	const [cityPicture, setCityPicture] = useState("");
	const [cityDescription, setCityDescription] = useState("");

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

	const deleteButtonClick = async (cityData) => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${cityData.name}?`
		);
		if (confirm) {
			let countryUrl = `${process.env.REACT_APP_API_HOST}/api/countries/${countryData.pk}`;
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
				setSubmitted(true);
			} else {
				console.error(response);
			}
		}
	};
	return (
		<div className="grid grid-cols-5">
			<div className="flex flex-col col-start-2 col-span-3 items-center">
				<h1>City Form</h1>
				<form
					onSubmit={handleCitySubmit}
					className="flex flex-col gap-2 w-full"
				>
					<div className="flex flex-col">
						<label htmlFor="city-name">City Name</label>
						<input
							value={cityName}
							onChange={(e) => setCityName(e.target.value)}
							className="border"
							required
							type="text"
							id="city-name"
							name="city-name"
							placeholder="City Name..."
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="city-url">City Picture Url</label>
						<input
							value={cityPicture}
							onChange={(e) => setCityPicture(e.target.value)}
							className="border"
							type="text"
							id="city-url"
							name="city-url"
							placeholder="City Picture Url..."
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="city-description">
							City Description
						</label>
						<textarea
							value={cityDescription}
							onChange={(e) => setCityDescription(e.target.value)}
							className="flex border"
							type="text"
							name="city-description"
							placeholder="City Description..."
							rows="7"
						/>
					</div>
					{submitted ? (
						<div className="flex flex-row justify-around">
							<button
								type="submit"
								className="border w-1/3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full"
							>
								Edit
							</button>
							<button
								onClick={() => deleteButtonClick(cityData)}
								type="button"
								className="border w-1/3 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full"
							>
								Delete
							</button>
						</div>
					) : (
						<div className="flex justify-center">
							<button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
								Add
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default CityCreate;
