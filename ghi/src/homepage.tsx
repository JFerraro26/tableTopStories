function Homepage() {
	return (
		<div className="grid grid-cols-7">
			<h1 className="mt-10 col-start-1 col-span-7 text-7xl font-bold text-center">
				Table Top Stories
			</h1>
			<img
				className="mt-10 col-start-2 col-span-5"
				src="https://media.istockphoto.com/id/1181398275/photo/tabletop-roleplaying-flat-lay-with-colorful-rpg-and-game-dices-character-sheet-rule-book-and.jpg?s=1024x1024&w=is&k=20&c=_ORKFVgjI5_RiYhWSsqsLnSVqm-vEdA6bfKDLNxqCWE="
				alt="Epic TapleTop"
			/>
			<p className="mt-10 col-start-1 col-span-7 text-2xl text-center">
				A Place to Build an Epic Campaign
			</p>
		</div>
	);
}

export default Homepage;
