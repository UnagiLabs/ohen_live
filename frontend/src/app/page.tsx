"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const [animate, setAnimate] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimate(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="relative min-h-screen">
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/back.png')" }}
			/>
			<div className="relative z-10">
				<div className="absolute left-12 top-32">
					<Image
						src="/OH! EN.png"
						alt="OH EN Logo"
						width={480}
						height={240}
						className={animate ? 'animate-bounce' : ''}
					/>
				</div>
				<div className="flex flex-col items-center justify-center min-h-screen">
					<button className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-xl transition-all transform hover:scale-105 translate-y-[3cm] -translate-x-[12cm]" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
						Launch ♪
					</button>
					<p className="text-black text-xl mt-4 translate-y-[3cm] -translate-x-[12cm]" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
						Together we cheer. Together you earn.
					</p>
				</div>
			</div>
		</div>
	);
}
