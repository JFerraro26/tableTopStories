function Description({ description }) {
	return (
		<div className="grid grid-cols-7 max-w-5xl py-4">
			<div className="mb-6 relative border-2 border-slate-600 overflow-hidden rounded-2xl aspect-video col-start-2 col-span-5">
				<img
					className="w-full h-full top-0 left-0 object-cover"
					src={description?.picture}
					alt="Map"
				/>
			</div>
			<p className="mx-4 whitespace-pre-line col-start-1 col-span-7">
				{description?.description}
			</p>
		</div>
	);
}
export default Description;
