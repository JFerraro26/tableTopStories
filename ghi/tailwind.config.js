/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"table-dice":
					"url('https://media.istockphoto.com/id/1181398275/photo/tabletop-roleplaying-flat-lay-with-colorful-rpg-and-game-dices-character-sheet-rule-book-and.jpg?s=1024x1024&w=is&k=20&c=_ORKFVgjI5_RiYhWSsqsLnSVqm-vEdA6bfKDLNxqCWE=')",
			},
		},
	},
	plugins: [],
};
