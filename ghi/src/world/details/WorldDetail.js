function WorldDetail({ world }) {
	return (
		<div className="grid grid-cols-7">
			<h1 className="mt-6 text-center text-4xl font-bold col-start-1 col-span-7">
				{world?.name}
			</h1>
			<div className="my-6 relative border-2 border-slate-600 overflow-hidden rounded-2xl aspect-video col-start-2 col-span-5">
				<img
					className="w-full h-full top-0 left-0 object-cover"
					src={world?.picture}
					alt="Map"
				/>
			</div>
			<p className="mx-4 whitespace-pre-line col-start-1 col-span-7">
				{world?.description}
			</p>
		</div>
	);
}

export default WorldDetail;
