import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout/MainLayout";

// import routes
import Home from "./components/pages/Home/HomePage";
import NotFound from "./components/pages/NotFound/NotFoundPage";
import Prices from "./components/pages/Prices/PricesPage";
import Order from "./components/pages/Order/OrderPage.js";

const App = () => {
	const [socket, setSocket] = useState("");

	useEffect(() => {
		const socket = io(
			process.env.NODE_ENV === "production" ? "" : "ws://localhost:8000",
			{ transports: ["websocket"] }
		);
		setSocket(socket);
	}, []);

	return (
		<MainLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/prices" element={<Prices />} />
				<Route path="/order-a-ticket" element={<Order />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</MainLayout>
	);
};

export default App;
