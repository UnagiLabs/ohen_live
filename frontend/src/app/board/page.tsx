"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface StreamerRank {
	rank: number;
	streamer: string;
	avatar: string;
	starRank: number;
	totalSupport: number;
	supporterCount: number;
	revenueShare: number; // 星4-5のみ、割当パーセンテージ
	genre: string;
	isEligibleForRevenue: boolean;
}

const mockStreamerRanking: StreamerRank[] = [
	{
		rank: 1,
		streamer: "Sakura 桜",
		avatar: "/cooking1.png",
		starRank: 5,
		totalSupport: 12500,
		supporterCount: 247,
		revenueShare: 4.2,
		genre: "Vlog",
		isEligibleForRevenue: true,
	},
	{
		rank: 2,
		streamer: "Music Sister 音",
		avatar: "/piano1.png",
		starRank: 5,
		totalSupport: 10800,
		supporterCount: 189,
		revenueShare: 3.8,
		genre: "Music",
		isEligibleForRevenue: true,
	},
	{
		rank: 3,
		streamer: "Miyuki 星",
		avatar: "/phone.png",
		starRank: 4,
		totalSupport: 8900,
		supporterCount: 156,
		revenueShare: 2.5,
		genre: "Vtuber",
		isEligibleForRevenue: true,
	},
	{
		rank: 4,
		streamer: "Rin 月", 
		avatar: "/piano2.png",
		starRank: 4,
		totalSupport: 7200,
		supporterCount: 134,
		revenueShare: 2.0,
		genre: "Music",
		isEligibleForRevenue: true,
	},
	{
		rank: 5,
		streamer: "Mai 舞",
		avatar: "/cooking3.png",
		starRank: 3,
		totalSupport: 5800,
		supporterCount: 98,
		revenueShare: 0,
		genre: "Vlog",
		isEligibleForRevenue: false,
	},
	{
		rank: 6,
		streamer: "Ai 愛",
		avatar: "/piano3.png",
		starRank: 3,
		totalSupport: 4500,
		supporterCount: 87,
		revenueShare: 0,
		genre: "Vlog",
		isEligibleForRevenue: false,
	},
	{
		rank: 7,
		streamer: "Rock Bro 響",
		avatar: "/cooking1.png",
		starRank: 2,
		totalSupport: 3200,
		supporterCount: 65,
		revenueShare: 0,
		genre: "Music",
		isEligibleForRevenue: false,
	},
	{
		rank: 8,
		streamer: "Composer K 奏",
		avatar: "/piano1.png",
		starRank: 2,
		totalSupport: 2800,
		supporterCount: 52,
		revenueShare: 0,
		genre: "Music",
		isEligibleForRevenue: false,
	},
	{
		rank: 9,
		streamer: "Kanon 花",
		avatar: "/phone.png",
		starRank: 1,
		totalSupport: 1950,
		supporterCount: 43,
		revenueShare: 0,
		genre: "Vtuber",
		isEligibleForRevenue: false,
	},
	{
		rank: 10,
		streamer: "Yuki 雪",
		avatar: "/cooking3.png",
		starRank: 1,
		totalSupport: 1200,
		supporterCount: 28,
		revenueShare: 0,
		genre: "Vlog",
		isEligibleForRevenue: false,
	},
];

const getStarDisplay = (starRank: number) => {
	return "★".repeat(starRank) + "☆".repeat(5 - starRank);
};

const getSeasonInfo = () => {
	const now = new Date();
	const month = now.getMonth() + 1; // 0-based to 1-based
	
	if (month >= 6 && month <= 8) {
		return { season: "Summer", emoji: "☀️", color: "#FFB3BF" };
	} else if (month >= 9 && month <= 11) {
		return { season: "Autumn", emoji: "🍂", color: "#E8D3F3" };
	} else if (month >= 12 || month <= 2) {
		return { season: "Winter", emoji: "❄️", color: "#B3E5FC" };
	} else {
		return { season: "Spring", emoji: "🌸", color: "#C8E6C9" };
	}
};

export default function BoardPage() {
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string>("");
	const [selectedGenre, setSelectedGenre] = useState<string>("All");
	const seasonInfo = getSeasonInfo();
	
	const genres = ["All", "Vlog", "Vtuber", "Music"];
	
	const filteredStreamers = selectedGenre === "All" 
		? mockStreamerRanking 
		: mockStreamerRanking.filter(streamer => streamer.genre === selectedGenre);

	const connectWallet = async () => {
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
							className="px-4 py-2 rounded-full text-white font-semibold shadow-md"
							style={{ 
								backgroundColor: "#E8D3F3",
								fontFamily: 'Comic Sans MS, cursive'
							}}
						>
							Leaderboard
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
					{/* ヘッダー */}
					<div className="text-center mb-8">
						<h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
							Leaderboard
						</h2>
						<p className="text-lg text-gray-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
							Streamer Star Rankings - Where creators shine bright 星
						</p>
					</div>

					{/* ジャンルフィルター */}
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

					{/* ランキング情報パネル */}
					<div className="bg-white rounded-xl shadow-lg p-6 mb-8">
						<h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
							Star Rank System 星ランク (Example)
						</h3>
						
						{/* 基本ルール */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div className="bg-gray-50 rounded-lg p-4">
								<h4 className="font-bold text-gray-800 mb-2">★☆☆☆☆ - ★★★☆☆ (Star 1-3)</h4>
								<p className="text-sm text-gray-600">
									Support only - No revenue sharing to OHEN PASS holders
								</p>
							</div>
							<div className="bg-green-50 rounded-lg p-4">
								<h4 className="font-bold text-green-800 mb-2">★★★★☆ - ★★★★★ (Star 4-5)</h4>
								<p className="text-sm text-green-700">
									Revenue sharing enabled - OHEN PASS holders receive streamer-set allocation
								</p>
							</div>
						</div>

						{/* 詳細基準 */}
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-3">
								<h4 className="font-bold text-gray-800">Star Rank Criteria (Example)</h4>
								<div className="text-xs text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
									Updated Every 3 Months
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
								<div className="text-center p-3 bg-white rounded-lg">
									<div className="text-lg mb-2">★☆☆☆☆</div>
									<div className="space-y-1 text-xs">
										<p><strong>3M Support:</strong> $0-999</p>
										<p><strong>Supporters:</strong> 1-29</p>
										<p><strong>Monthly:</strong> 10h+</p>
									</div>
								</div>
								<div className="text-center p-3 bg-white rounded-lg">
									<div className="text-lg mb-2">★★☆☆☆</div>
									<div className="space-y-1 text-xs">
										<p><strong>3M Support:</strong> $1K-2.9K</p>
										<p><strong>Supporters:</strong> 30-59</p>
										<p><strong>Monthly:</strong> 20h+</p>
									</div>
								</div>
								<div className="text-center p-3 bg-white rounded-lg">
									<div className="text-lg mb-2">★★★☆☆</div>
									<div className="space-y-1 text-xs">
										<p><strong>3M Support:</strong> $3K-7.9K</p>
										<p><strong>Supporters:</strong> 60-99</p>
										<p><strong>Monthly:</strong> 30h+</p>
									</div>
								</div>
								<div className="text-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
									<div className="text-lg mb-2">★★★★☆</div>
									<div className="space-y-1 text-xs">
										<p><strong>3M Support:</strong> $8K-15.9K</p>
										<p><strong>Supporters:</strong> 100-199</p>
										<p><strong>Monthly:</strong> 40h+</p>
									</div>
									<div className="text-green-600 font-bold text-xs mt-2">Revenue Share</div>
								</div>
								<div className="text-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
									<div className="text-lg mb-2">★★★★★</div>
									<div className="space-y-1 text-xs">
										<p><strong>3M Support:</strong> $16K+</p>
										<p><strong>Supporters:</strong> 200+</p>
										<p><strong>Monthly:</strong> 50h+</p>
									</div>
									<div className="text-green-600 font-bold text-xs mt-2">Revenue Share</div>
								</div>
							</div>
							<p className="text-xs text-gray-500 mt-3 text-center">
								3M = 3 Months Total | Monthly = Monthly Streaming Hours | ⏰ Next Update: Sep 1, 2024
							</p>
						</div>
					</div>

					{/* ランキングテーブル */}
					<div className="bg-white rounded-xl shadow-lg overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead style={{ backgroundColor: seasonInfo.color }}>
									<tr>
										<th className="px-6 py-4 text-left font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											Rank
										</th>
										<th className="px-6 py-4 text-left font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											Streamer
										</th>
										<th className="px-6 py-4 text-left font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											Star Rank
										</th>
										<th className="px-6 py-4 text-left font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											Total Support
										</th>
										<th className="px-6 py-4 text-left font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											Supporters
										</th>
										<th className="px-6 py-4 text-left font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											Revenue Share
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredStreamers.map((streamer, index) => (
										<tr key={streamer.rank} className={`border-b hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-yellow-50' : ''}`}>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													<span className="text-2xl font-bold text-gray-800">
														#{streamer.rank}
													</span>
													{index === 0 && <span className="text-2xl">🥇</span>}
													{index === 1 && <span className="text-2xl">🥈</span>}
													{index === 2 && <span className="text-2xl">🥉</span>}
												</div>
											</td>
											<td className="px-6 py-4">
												<a 
													href={`/streamer/${streamer.streamer.toLowerCase().replace(/\s+/g, '-').replace('桜', 'sakura').replace('音', 'music-sister').replace('星', 'miyuki').replace('月', 'rin').replace('舞', 'mai').replace('愛', 'ai').replace('響', 'rock-bro').replace('奏', 'composer-k').replace('花', 'kanon').replace('雪', 'yuki')}`}
													className="flex items-center gap-4 hover:bg-gray-100 rounded-lg p-2 transition-colors"
												>
													<Image
														src={streamer.avatar}
														alt={streamer.streamer}
														width={50}
														height={50}
														className="rounded-full w-12 h-12 object-cover"
													/>
													<div>
														<p className="font-bold text-gray-800 hover:text-purple-600 transition-colors" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
															{streamer.streamer}
														</p>
														<p className="text-sm text-gray-600">{streamer.genre}</p>
														{streamer.starRank <= 3 && (
															<p className="text-xs text-purple-600 font-semibold">Click for OHEN PASS 灯 competition!</p>
														)}
													</div>
												</a>
											</td>
											<td className="px-6 py-4">
												<span className="text-2xl" title={`Star ${streamer.starRank}`}>
													{getStarDisplay(streamer.starRank)}
												</span>
											</td>
											<td className="px-6 py-4">
												<span className="font-bold text-gray-800">
													${streamer.totalSupport.toLocaleString()}
												</span>
											</td>
											<td className="px-6 py-4">
												<span className="text-gray-600">
													{streamer.supporterCount}
												</span>
											</td>
											<td className="px-6 py-4">
												{streamer.isEligibleForRevenue ? (
													<span className="px-3 py-1 rounded-full text-white font-semibold" style={{ backgroundColor: "#4CAF50" }}>
														{streamer.revenueShare}%
													</span>
												) : (
													<span className="px-3 py-1 rounded-full text-gray-600 bg-gray-200">
														N/A
													</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}