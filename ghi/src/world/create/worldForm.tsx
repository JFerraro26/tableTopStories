import { useState, useEffect, FormEvent } from "react";
import { useAppDispatch, select } from "../../redux/hooks";
import { selectCreateWorld } from "../../redux/selectors";
import { setWorld, clearWorld } from "../../redux/slices/worldCreateSlice";
import { motion, AnimatePresence } from "framer-motion";

type AccountProps = {
	account: {
		expiry: Date;
		token: string;
		user: {
			date_joined: Date;
			email: string;
			id: string;
			is_staff: boolean;
			is_superuser: boolean;
			last_login: Date;
			username: string;
		};
	};
};

function WorldForm({ account }: AccountProps) {
	const world = select(selectCreateWorld);
	const dispatch = useAppDispatch();
	const [submited, setSubmited] = useState(false);
	const [worldName, setWorldName] = useState("");
	const [worldPic, setWorldPic] = useState("https://placehold.co/600x400");
	const [worldDescription, setWorldDescription] = useState("");
	const [successfulSubmit, setSuccessfulSubmit] = useState(false);
	const [successfulEdit, setSuccessfulEdit] = useState(false);

	useEffect(() => {
		if (world.name) {
			setWorldName(world?.name);
			setWorldPic(world?.picture);
			setWorldDescription(world?.description);
			setSubmited(true);
		} else {
			setWorldName("");
			setWorldPic("https://placehold.co/600x400");
			setWorldDescription("");
			setSubmited(false);
		}
	}, [world]);
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

	const handleWorldSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const accountId = account.user.id;
		const data = {
			name: worldName,
			picture: worldPic,
			description: worldDescription,
			created_by: accountId,
		};
		if (submited) {
			let worldUrlEdit = `${
				import.meta.env.VITE_BASE_URL
			}/api/worlds/update/${world.pk}`;
			let worldFetchConfigEdit = {
				method: "put",
				body: JSON.stringify(data),
				headers: {
					Authorization: `Token ${account.token}`,
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
				dispatch(setWorld(createdWorldEdit));
				setSuccessfulEdit(true);
				setSubmited(true);
			} else {
				console.error(responseEdit);
			}
		} else {
			let worldUrl = `${import.meta.env.VITE_BASE_URL}/api/worlds`;
			let worldFetchConfig = {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					Authorization: `Token ${account.token}`,
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(worldUrl, worldFetchConfig);
			if (response.ok) {
				const createdWorld = await response.json();
				createdWorld.countries = [];
				dispatch(setWorld(createdWorld));
				setSuccessfulSubmit(true);
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
			let countryUrl = `${import.meta.env.VITE_BASE_URL}/api/worlds/${
				world.pk
			}`;
			let fetchConfig = {
				headers: { Authorization: `Token ${account.token}` },
				method: "delete",
			};
			const response = await fetch(countryUrl, fetchConfig);
			if (response.ok) {
				dispatch(clearWorld());
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
		<div className="flex-grow flex flex-col w-full">
			<div className="flex flex-col mx-10 p-2 rounded-xl bg-zinc-700 items-center gap-2 shadow-lg shadow-slate-800">
				<h1 className="text-center text-xl font-bold">World Form</h1>
				<form
					onSubmit={handleWorldSubmit}
					className="flex flex-col w-full mx-6"
				>
					<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
						<label
							className="font-semibold text-white"
							htmlFor="name"
						>
							Name:
						</label>
						<input
							value={worldName}
							onChange={(e) => setWorldName(e.target.value)}
							className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
							required
							type="text"
							id="name"
							name="name"
						/>
					</div>
					<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
						<label
							className="font-semibold text-white"
							htmlFor="world-url"
						>
							Image URL
						</label>
						<input
							value={worldPic}
							onChange={(e) => setWorldPic(e.target.value)}
							className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
							type="text"
							id="world-url"
							name="world-url"
						/>
					</div>
					<div className="flex flex-col gap-1 text-sm sm:text-xl sm:gap-2 md:text-2xl xl:text-3xl">
						<label
							className="font-semibold text-white"
							htmlFor="world-description"
						>
							Description
						</label>
						<textarea
							value={worldDescription}
							onChange={(e) =>
								setWorldDescription(e.target.value)
							}
							className="rounded-lg px-2 py-1 bg-slate-600 border border-transparent focus:outline-none focus:border-white"
							type="text"
							name="world-description"
							rows="8"
						/>
					</div>
					{submited ? (
						<div className="my-2 flex flex-row justify-around">
							<button type="submit" className="">
								Edit World
							</button>
							<button
								onClick={() => deleteButtonClick(world)}
								type="button"
								className=""
							>
								Delete World
							</button>
						</div>
					) : (
						<div className="my-2 flex justify-center">
							<button className="">Add World</button>
						</div>
					)}
				</form>
			</div>

			<div>
				<AnimatePresence>
					{successfulSubmit ? (
						<motion.h1
							className="m-4 rounded-xl text-white bg-green-600 text-sm text-center"
							key="Created"
							initial={{ x: "100vw" }}
							animate={{ x: 0 }}
							transition={{ duration: 1 }}
							exit={{
								x: "100vw",
								transition: { duration: 2 },
							}}
						>
							World Successfully Created!!!!
						</motion.h1>
					) : successfulEdit ? (
						<motion.h1
							className="m-4 rounded-xl text-white bg-green-600 text-sm text-center"
							key="Created"
							initial={{ x: "100vw" }}
							animate={{ x: 0 }}
							transition={{ duration: 1 }}
							exit={{
								x: "100vw",
								transition: { duration: 2 },
							}}
						>
							World Edited Successfully!!!!
						</motion.h1>
					) : (
						<h1 className="invisible m-4 rounded-xl text-sm text-center">
							World Successfully Created!!!!
						</h1>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default WorldForm;
