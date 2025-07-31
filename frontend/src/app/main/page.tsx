"use client";
import Image from "next/image";
import { useState } from "react";

interface StreamData {
	id: string;
	title: string;
	streamer: string;
	thumbnail: string;
	viewers: number;
	isLive: boolean;
}

const mockStreams: { [key: string]: StreamData[] } = {
	Vlog: [
		{
			id: "1",
			title: "Morning Breakfast Cooking 🍳",
			streamer: "Sakura 桜",
			thumbnail: "/cooking1.png",
			viewers: 1234,
			isLive: true,
		},
		{
			id: "2", 
			title: "Cafe Hopping Adventure ☕",
			streamer: "Mai 舞",
			thumbnail: "/phone.png",
			viewers: 567,
			isLive: true,
		},
		{
			id: "3",
			title: "Room Makeover Time ✨",
			streamer: "Ai 愛",
			thumbnail: "/cooking3.png",
			viewers: 890,
			isLive: false,
		},
	],
	Vtuber: [
		{
			id: "4",
			title: "Minecraft Building Stream 🏗️",
			streamer: "Miyuki 星",
			thumbnail: "/phone.png",
			viewers: 2345,
			isLive: true,
		},
		{
			id: "5",
			title: "Singing Stream 🎵",
			streamer: "Rin 月",
			thumbnail: "/back.png",
			viewers: 1678,
			isLive: true,
		},
		{
			id: "6",
			title: "Just Chatting ~ Daily Stories",
			streamer: "Kanon 花",
			thumbnail: "/phone.png",
			viewers: 456,
			isLive: false,
		},
	],
	Music: [
		{
			id: "7",
			title: "Piano Live Performance 🎹",
			streamer: "Music Sister 音",
			thumbnail: "/piano1.png",
			viewers: 987,
			isLive: true,
		},
		{
			id: "8",
			title: "Guitar Practice Session 🎸",
			streamer: "Rock Bro 響",
			thumbnail: "/piano2.png",
			viewers: 654,
			isLive: true,
		},
		{
			id: "9",
			title: "Composing New Track 🎼",
			streamer: "Composer K 奏",
			thumbnail: "/piano3.png",
			viewers: 321,
			isLive: false,
		},
	],
};

export default function MainPage() {
	const [selectedGenre, setSelectedGenre] = useState<string>("Vlog");
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string>("");
	const genres = ["Vlog", "Vtuber", "Music"];

	const connectWallet = async () => {
		// モックのウォレット接続処理
		setIsWalletConnected(true);
		setWalletAddress("0x1234...5678");
	};

	const disconnectWallet = () => {
		setIsWalletConnected(false);
		setWalletAddress("");
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: "#FFFAD1" }}>
			{/* ヘッダー */}
			<header className="p-4 flex items-center justify-between" style={{ backgroundColor: "#FFB3BF" }}>
				<div className="flex items-center gap-8">
					<div className="flex items-center gap-4">
						<Image
							src="/OH! EN.png"
							alt="OH EN Logo"
							width={120}
							height={60}
						/>
						<h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
							OH!EN LIVE
						</h1>
					</div>
					
					{/* メインメニュー */}
					<nav className="hidden md:flex gap-6">
						<a 
							href="/main" 
							className="px-4 py-2 rounded-full text-gray-800 font-semibold hover:text-white hover:shadow-md transition-all"
							style={{ 
								backgroundColor: "#FFFFFF",
								fontFamily: 'Comic Sans MS, cursive'
							}}
						>
							Home
						</a>
						<a 
							href="/board" 
							className="px-4 py-2 rounded-full text-gray-800 font-semibold hover:text-white hover:shadow-md transition-all"
							style={{ 
								backgroundColor: "#FFFFFF",
								fontFamily: 'Comic Sans MS, cursive'
							}}
						>
							四季Board
						</a>
						<a 
							href="/mypage" 
							className="px-4 py-2 rounded-full text-gray-800 font-semibold hover:text-white hover:shadow-md transition-all"
							style={{ 
								backgroundColor: "#FFFFFF",
								fontFamily: 'Comic Sans MS, cursive'
							}}
						>
							My page
						</a>
					</nav>
				</div>
				<div className="flex gap-4 items-center">
					{!isWalletConnected ? (
						<button 
							onClick={connectWallet}
							className="px-4 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all" 
							style={{ backgroundColor: "#E8D3F3" }}
						>
							Connect Wallet
						</button>
					) : (
						<div className="flex items-center gap-2">
							<div className="px-3 py-2 rounded-full text-white font-semibold" style={{ backgroundColor: "#4CAF50" }}>
								<span className="text-sm">{walletAddress}</span>
							</div>
							<button 
								onClick={disconnectWallet}
								className="px-3 py-1 rounded-full text-gray-600 hover:text-gray-800 text-sm"
							>
								Disconnect
							</button>
						</div>
					)}
				</div>
			</header>

			{/* メインコンテンツ */}
			<main className="p-6">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
						Together we cheer. Together you earn.
					</h2>
					<p className="text-lg text-gray-600 mb-8 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
						Where fans' "light 灯" becomes creators' "star 星" in our live community
					</p>

					{/* ジャンル選択 */}
					<div className="flex justify-center gap-4 mb-8">
						{genres.map((genre) => (
							<button
								key={genre}
								onClick={() => setSelectedGenre(genre)}
								className={`px-6 py-3 rounded-full font-bold transition-all ${
									selectedGenre === genre
										? "text-white shadow-lg"
										: "text-gray-600 hover:shadow-md"
								}`}
								style={{
									backgroundColor: selectedGenre === genre ? "#E8D3F3" : "#FFFFFF",
									fontFamily: 'Comic Sans MS, cursive'
								}}
							>
								{genre}
							</button>
						))}
					</div>

					{/* 配信一覧 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mockStreams[selectedGenre].map((stream) => (
							<div
								key={stream.id}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
							>
								<div className="relative">
									<Image
										src={stream.thumbnail}
										alt={stream.title}
										width={400}
										height={225}
										className="w-full h-48 object-cover"
									/>
									{stream.isLive && (
										<div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">
											LIVE
										</div>
									)}
									<div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-70 text-white text-sm rounded">
										👥 {stream.viewers.toLocaleString()}
									</div>
								</div>
								<div className="p-4">
									<h3 className="font-bold text-lg mb-2 line-clamp-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
										{stream.title}
									</h3>
									<p className="text-gray-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
										{stream.streamer}
									</p>
									<div className="mt-3 flex gap-2">
										<button className="px-3 py-1 text-sm rounded-full text-white" style={{ backgroundColor: "#FFB3BF" }}>
											Support
										</button>
										<button className="px-3 py-1 text-sm rounded-full text-white" style={{ backgroundColor: "#E8D3F3" }}>
											Send 花
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}