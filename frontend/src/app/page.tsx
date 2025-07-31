"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [animate, setAnimate] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimate(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	const handleLaunch = () => {
		router.push('/main');
	};

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* PC用背景 */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
				style={{ backgroundImage: "url('/back.png')" }}
			/>
			{/* スマホ用背景 */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
				style={{ backgroundImage: "url('/phone.png')" }}
			/>
			<div className="relative z-10 min-h-screen flex flex-col">
				{/* ロゴ - モバイルでは左上に配置 */}
				<div className="absolute left-12 top-32 md:left-12 md:top-32 max-md:left-0 max-md:top-4">
					<Image
						src="/OH! EN.png"
						alt="OH EN Logo"
						width={480}
						height={240}
						className={`${animate ? 'animate-bounce' : ''} max-md:w-[134px] max-md:h-[67px]`}
					/>
				</div>
				
				{/* ボタンとテキスト - モバイルでは中央に配置 */}
				<div className="flex flex-col items-center justify-center min-h-screen px-4">
					<button 
						onClick={handleLaunch}
						className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-xl transition-all transform hover:scale-105 md:translate-y-[3cm] md:-translate-x-[12cm] max-md:text-xl max-md:px-8" 
						style={{ fontFamily: 'Comic Sans MS, cursive' }}
					>
						Launch ♪
					</button>
					<p className="text-black text-xl mt-4 md:translate-y-[3cm] md:-translate-x-[12cm] max-md:text-lg max-md:text-center max-md:px-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
						Together we cheer. Together you earn.
					</p>
				</div>
			</div>
		</div>
	);
}
