import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCreatedWorld,
	clearCreatedWorld,
} from "../../redux/slices/worldCreateSlice";
import { getNewWorldEdit } from "../../redux/selectors/selectors";

function WorldCreate() {
	const [submited, setSubmited] = useState(false);
	const world = useSelector(getNewWorldEdit);
	const [worldName, setWorldName] = useState("");
	const [worldPic, setWorldPic] = useState("https://placehold.co/600x400");
	const [worldDescription, setWorldDescription] = useState("");

	useEffect(() => {
		if (world) {
			setWorldName(world.name);
			setWorldPic(world.picture);
			setWorldDescription(world.description);
			setSubmited(true);
		} else {
			setWorldName("");
			setWorldPic();
			setWorldDescription("");
			setSubmited(false);
		}
	}, [world]);

	const dispatch = useDispatch();
	const handleWorldSubmit = async (event) => {
		event.preventDefault();
		const data = {};
		data.name = worldName;
		data.picture = worldPic;
		data.description = worldDescription;
		if (submited) {
			let worldUrlEdit = `${process.env.REACT_APP_API_HOST}/api/worlds/${world.pk}`;
			let worldFetchConfigEdit = {
				method: "put",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const responseEdit = await fetch(
				worldUrlEdit,
				worldFetchConfigEdit
			);
			if (responseEdit.ok) {
				const createdWorldEdit = await responseEdit.json();
				createdWorldEdit.countries = world.countries;
				dispatch(setCreatedWorld(createdWorldEdit));
				setSubmited(true);
			} else {
				console.error(responseEdit);
			}
		} else {
			let worldUrl = `${process.env.REACT_APP_API_HOST}/api/worlds`;
			let worldFetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(worldUrl, worldFetchConfig);
			if (response.ok) {
				const createdWorld = await response.json();
				createdWorld.countries = [];
				dispatch(setCreatedWorld(createdWorld));
				setSubmited(true);
			} else {
				console.error(response);
			}
		}
	};
	const deleteButtonClick = async (world) => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${world.name}?`
		);
		if (confirm) {
			let countryUrl = `${process.env.REACT_APP_API_HOST}/api/worlds/${world.pk}`;
			let fetchConfig = {
				method: "delete",
			};
			const response = await fetch(countryUrl, fetchConfig);
			if (response.ok) {
				dispatch(clearCreatedWorld());
				setWorldName("");
				setWorldPic("https://placehold.co/600x400");
				setWorldDescription("");
				setSubmited(false);
			} else {
				console.error(response);
			}
		}
	};

	return (
		<div className="grid grid-cols-5">
			<div className="m-5 flex flex-col col-start-1 col-span-5 items-center">
				<h1 className="text-4xl font-bold">World Form</h1>
				<form
					onSubmit={handleWorldSubmit}
					className="flex flex-col w-full gap-2"
				>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="name"
						>
							Name
						</label>
						<input
							value={worldName}
							onChange={(e) => setWorldName(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							required
							type="text"
							id="name"
							name="name"
						/>
					</div>
					<div className="flex flex-col ">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="world-url"
						>
							Map Image URL
						</label>
						<input
							value={worldPic}
							onChange={(e) => setWorldPic(e.target.value)}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							id="world-url"
							name="world-url"
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="my-2 px-2 font-semibold text-2xl"
							htmlFor="world-description"
						>
							Description
						</label>
						<textarea
							value={worldDescription}
							onChange={(e) =>
								setWorldDescription(e.target.value)
							}
							className="rounded-lg text-lg p-2 bg-slate-900 border border-black focus:outline-none focus:border-red-600"
							type="text"
							name="world-description"
							rows="10"
						/>
					</div>
					{submited ? (
						<div className="flex flex-row justify-around">
							<button
								type="submit"
								className="border w-1/3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black rounded-full"
							>
								Edit
							</button>
							<button
								onClick={() => deleteButtonClick(world)}
								type="button"
								className="border w-1/3 border-red-500 text-red-500 hover:bg-red-500 hover:text-black rounded-full"
							>
								Delete
							</button>
						</div>
					) : (
						<div className="flex justify-center">
							<button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black rounded-full">
								Add
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default WorldCreate;
