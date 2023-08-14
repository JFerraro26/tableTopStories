import { useState } from "react";
import LoginInForm from "./loginForm";
import SignUpForm from "./signUpForm.";
import { motion, AnimatePresence } from "framer-motion";

function LandingPage() {
	const [page, setPage] = useState("login");
	return (
		<AnimatePresence>
			{page === "login" ? (
				<motion.div
					key="login"
					initial={{ opacity: 0, rotateY: -180 }}
					animate={{ opacity: 1, rotateY: 0 }}
					transition={{ duration: 0.25 }}
					className="flex-grow"
				>
					<LoginInForm setPage={setPage} />
				</motion.div>
			) : (
				<motion.div
					key="sign-up"
					initial={{ opacity: 0, rotateY: -180 }}
					animate={{ opacity: 1, rotateY: 0 }}
					transition={{ duration: 0.25 }}
					className="flex-grow"
				>
					<SignUpForm setPage={setPage} />{" "}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default LandingPage;
