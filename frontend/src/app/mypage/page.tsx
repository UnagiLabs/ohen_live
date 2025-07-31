"use client";
import Image from "next/image";
import { useState } from "react";

interface SupportedStreamer {
	id: string;
	name: string;
	avatar: string;
	totalSupported: number;
	myRank: number;
	totalSupporters: number;
}

interface SponsorNFT {
	id: string;
	streamer: string;
	streamerAvatar: string;
	image: string;
	incentiveRate: number;
	claimableAmount: number;
	totalEarned: number;
}

const mockSupportedStreamers: SupportedStreamer[] = [
	{
		id: "1",
		name: "Sakura 桜",
		avatar: "/cooking1.png",
		totalSupported: 2500,
		myRank: 3,
		totalSupporters: 127,
	},
	{
		id: "2",
		name: "Music Sister 音",
		avatar: "/piano1.png",
		totalSupported: 1800,
		myRank: 7,
		totalSupporters: 89,
	},
	{
		id: "3",
		name: "Miyuki 星",
		avatar: "/phone.png",
		totalSupported: 950,
		myRank: 15,
		totalSupporters: 203,
	},
];

const mockSponsorNFTs: SponsorNFT[] = [
	{
		id: "1",
		streamer: "Sakura 桜",
		streamerAvatar: "/cooking1.png",
		image: "/cooking3.png",
		incentiveRate: 3.5,
		claimableAmount: 24.50,
		totalEarned: 156.80,
	},
	{
		id: "2", 
		streamer: "Music Sister 音",
		streamerAvatar: "/piano1.png",
		image: "/piano2.png",
		incentiveRate: 2.8,
		claimableAmount: 18.20,
		totalEarned: 89.40,
	},
];

export default function MyPage() {
	const [selectedStreamer, setSelectedStreamer] = useState<SupportedStreamer | null>(null);
	const [isWalletConnected, setIsWalletConnected] = useState(true);
	const [walletAddress] = useState("0x1234...5678");

	// Mock user data
	const userData = {
		avatar: "/shizuku.jpg",
		name: "SHIZUKU",
		totalSpent: 5250,
		lightRank: "灯4",
		joinedDate: "2024.03.15",
	};

	const connectWallet = async () => {
		setIsWalletConnected(true);
	};

	const disconnectWallet = () => {
		setIsWalletConnected(false);
	};

	const handleClaimNFT = (nftId: string) => {
		console.log(`Claiming NFT ${nftId}`);
		// クレーム処理のロジック
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
							className="px-4 py-2 rounded-full text-white font-semibold shadow-md"
							style={{ 
								backgroundColor: "#E8D3F3",
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
					{/* ユーザープロフィール */}
					<div className="bg-white rounded-xl shadow-lg p-6 mb-8">
						<div className="flex items-center gap-6">
							<Image
								src={userData.avatar}
								alt={userData.name}
								width={100}
								height={100}
								className="rounded-full border-4 border-pink-200 w-24 h-24 object-cover"
							/>
							<div>
								<h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
									{userData.name}
								</h2>
								<div className="flex gap-6 text-gray-600">
									<div>
										<span className="font-semibold">Light Rank:</span>
										<span className="ml-2 px-2 py-1 rounded-full text-white text-sm" style={{ backgroundColor: "#E8D3F3" }}>
											{userData.lightRank}
										</span>
									</div>
									<div>
										<span className="font-semibold">Total Spent:</span>
										<span className="ml-2">${userData.totalSpent}</span>
									</div>
									<div>
										<span className="font-semibold">Joined:</span>
										<span className="ml-2">{userData.joinedDate}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* 応援しているストリーマー一覧 */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
								Supporting Streamers 応援
							</h3>
							<div className="space-y-4">
								{mockSupportedStreamers.map((streamer) => (
									<div key={streamer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
										<div className="flex items-center gap-4">
											<Image
												src={streamer.avatar}
												alt={streamer.name}
												width={50}
												height={50}
												className="rounded-full w-12 h-12 object-cover"
											/>
											<div>
												<button
													onClick={() => setSelectedStreamer(streamer)}
													className="font-bold text-gray-800 hover:text-purple-600 transition-colors"
													style={{ fontFamily: 'Comic Sans MS, cursive' }}
												>
													{streamer.name}
												</button>
												<p className="text-sm text-gray-600">
													Rank #{streamer.myRank} of {streamer.totalSupporters}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-semibold text-gray-800">${streamer.totalSupported}</p>
											<p className="text-sm text-gray-600">Total Supported</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* スポンサーNFT */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
								Sponsor NFTs - OHEN PASS 灯
							</h3>
							<div className="space-y-6">
								{mockSponsorNFTs.map((nft) => (
									<div key={nft.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
										<div className="flex gap-4 mb-4">
											<Image
												src={nft.image}
												alt={`${nft.streamer} NFT`}
												width={80}
												height={80}
												className="rounded-lg"
											/>
											<div className="flex-1">
												<h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
													{nft.streamer}
												</h4>
												<div className="text-sm text-gray-600 space-y-1">
													<p>Incentive Rate: <span className="font-semibold text-green-600">{nft.incentiveRate}%</span></p>
													<p>Total Earned: <span className="font-semibold">${nft.totalEarned}</span></p>
												</div>
											</div>
										</div>
										<div className="flex items-center justify-between pt-3 border-t">
											<div>
												<p className="text-lg font-bold text-green-600">${nft.claimableAmount}</p>
												<p className="text-sm text-gray-600">Available to Claim</p>
											</div>
											<button
												onClick={() => handleClaimNFT(nft.id)}
												className="px-4 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all"
												style={{ backgroundColor: "#E8D3F3" }}
											>
												Claim
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* リーダーボードモーダル */}
					{selectedStreamer && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedStreamer(null)}>
							<div className="bg-white rounded-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
								<div className="flex items-center gap-4 mb-4">
									<Image
										src={selectedStreamer.avatar}
										alt={selectedStreamer.name}
										width={60}
										height={60}
										className="rounded-full w-15 h-15 object-cover"
									/>
									<div>
										<h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											{selectedStreamer.name}
										</h3>
										<p className="text-gray-600">Support Leaderboard</p>
									</div>
								</div>
								<div className="bg-gray-50 rounded-lg p-4 mb-4">
									<div className="text-center">
										<p className="text-3xl font-bold text-purple-600">#{selectedStreamer.myRank}</p>
										<p className="text-gray-600">Your Rank</p>
									</div>
									<div className="mt-4 flex justify-around text-sm text-gray-600">
										<div className="text-center">
											<p className="font-semibold">${selectedStreamer.totalSupported}</p>
											<p>Your Support</p>
										</div>
										<div className="text-center">
											<p className="font-semibold">{selectedStreamer.totalSupporters}</p>
											<p>Total Supporters</p>
										</div>
									</div>
								</div>
								<button
									onClick={() => setSelectedStreamer(null)}
									className="w-full px-4 py-2 rounded-full text-white font-semibold"
									style={{ backgroundColor: "#FFB3BF" }}
								>
									Close
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}