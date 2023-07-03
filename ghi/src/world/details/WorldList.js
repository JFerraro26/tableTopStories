import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCreatedWorld } from "../../redux/slices/worldCreateSlice";

function WorldList() {
	const [worlds, setWorlds] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchWorldsData() {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/api/worlds`
			);
			if (response.ok) {
				const data = await response.json();
				setWorlds(data);
			} else {
				console.error(response);
			}
		}
		fetchWorldsData();
	}, []);

	const deleteButtonClick = async (world) => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${world.name}?`
		);
		if (confirm) {
			const worldUrl = `${process.env.REACT_APP_API_HOST}/api/worlds/${world.pk}`;
			const fetchConfig = { method: "delete" };
			const response = await fetch(worldUrl, fetchConfig);
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

	const editButtonClick = (world) => {
		dispatch(setCreatedWorld(world));
		navigate("/worlds/form");
	};

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
