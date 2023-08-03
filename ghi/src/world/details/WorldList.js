import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCreatedWorld } from "../../redux/slices/worldCreateSlice";
import { useGetUserWorldsQuery } from "../../redux/apis/worldsApi";

function WorldList() {
	const {
		data: worldsData,
		error,
		isLoading,
		refetch,
	} = useGetUserWorldsQuery();
	const [worlds, setWorlds] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
				const updatedWorlds = worlds.filter(
					(item) => item.pk !== world.pk
				);
				setWorlds(updatedWorlds);
			} else {
				console.error(response);
			}
		}
	};
	useEffect(() => {
		if (worldsData) {
			setWorlds(worldsData);
		}
	}, [worldsData]);
	useEffect(() => {
		refetch();
	}, [refetch]);
	const editButtonClick = (world) => {
		dispatch(setCreatedWorld(world));
		navigate("/worlds/form");
	};
	if (isLoading) {
		return <h1 className="mt-4 text-center text-5xl">Loading...</h1>;
	} else if (error) {
		return (
			<h1 className="mt-4 text-center text-5xl">Something Went Wrong</h1>
		);
	}
	return (
		<>
			<h1 className="text-center">My Worlds</h1>
			<table className="min-w-full text-center text-sm font-light">
				<thead className="border-b font-medium dark:border-neutral-500">
					<tr>
						<th
							scope="col"
							className=" px-6 py-4 dark:border-neutral-500"
						>
							World
						</th>
						<th
							scope="col"
							className=" px-6 py-4 dark:border-neutral-500"
						>
							Update/Delete
						</th>
					</tr>
				</thead>
				<tbody>
					{worlds?.map((world) => {
						return (
							<tr
								key={world.pk}
								className="border-b transition duration-300 ease-in-out hover:bg-slate-900"
							>
								<td className="whitespace-nowrap px-6 py-4">
									<Link
										className="hover:text-blue-400"
										state={{ world: world }}
										to="/worlds/detail"
									>
										{world.name}
									</Link>
								</td>
								<td className="whitespace-nowrap px-6 py-4">
									<div className="inline-flex">
										<button
											onClick={() =>
												editButtonClick(world)
											}
											className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
											type="button"
										>
											Update
										</button>
										<button
											onClick={() =>
												deleteButtonClick(world)
											}
											className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
											type="button"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default WorldList;
