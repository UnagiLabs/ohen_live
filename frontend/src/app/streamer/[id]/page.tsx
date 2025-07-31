"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface ChatMessage {
	id: string;
	user: string;
	avatar: string;
	message: string;
	timestamp: string;
	isSuperchat: boolean;
	amount?: number;
}

interface SupporterRank {
	rank: number;
	supporter: string;
	avatar: string;
	totalSupport: number;
	isCurrentUser: boolean;
	hasOhenPass: boolean;
}

interface StreamerData {
	id: string;
	name: string;
	avatar: string;
	starRank: number;
	genre: string;
	totalSupport: number;
	supporterCount: number;
	description: string;
	joinedDate: string;
	ohenPassLimit: number; // OHEN PASS獲得可能な上位何位まで
	seasonEndDate: string;
}

const mockStreamers: { [key: string]: StreamerData } = {
	"sakura": {
		id: "sakura",
		name: "Sakura 桜",
		avatar: "/cooking1.png",
		starRank: 2,
		genre: "Vlog",
		totalSupport: 3200,
		supporterCount: 67,
		description: "Daily cooking streams and lifestyle vlogs. Let's cook together! 🍳",
		joinedDate: "2024.02.15",
		ohenPassLimit: 10,
		seasonEndDate: "2024.08.31",
	},
	"music-sister": {
		id: "music-sister",
		name: "Music Sister 音",
		avatar: "/piano1.png",
		starRank: 3,
		genre: "Music",
		totalSupport: 5800,
		supporterCount: 98,
		description: "Piano performances and music creation. Feel the melody with me! 🎹",
		joinedDate: "2024.01.20",
		ohenPassLimit: 15,
		seasonEndDate: "2024.08.31",
	},
	"miyuki": {
		id: "miyuki", 
		name: "Miyuki 星",
		avatar: "/phone.png",
		starRank: 1,
		genre: "Vtuber",
		totalSupport: 1950,
		supporterCount: 43,
		description: "Gaming streams and virtual adventures! Join my world! 🎮",
		joinedDate: "2024.03.10",
		ohenPassLimit: 8,
		seasonEndDate: "2024.08.31",
	},
};

const mockSupporterRanking: { [key: string]: SupporterRank[] } = {
	"sakura": [
		{ rank: 1, supporter: "CryptoWhale 鯨", avatar: "/shizuku.jpg", totalSupport: 850, isCurrentUser: false, hasOhenPass: false },
		{ rank: 2, supporter: "FoodLover 愛", avatar: "/cooking3.png", totalSupport: 620, isCurrentUser: false, hasOhenPass: false },
		{ rank: 3, supporter: "SHIZUKU", avatar: "/shizuku.jpg", totalSupport: 480, isCurrentUser: true, hasOhenPass: false },
		{ rank: 4, supporter: "CookingFan 料", avatar: "/cooking1.png", totalSupport: 350, isCurrentUser: false, hasOhenPass: false },
		{ rank: 5, supporter: "DailyViewer 日", avatar: "/piano2.png", totalSupport: 280, isCurrentUser: false, hasOhenPass: false },
		{ rank: 6, supporter: "SakuraFan 桜", avatar: "/piano3.png", totalSupport: 220, isCurrentUser: false, hasOhenPass: false },
		{ rank: 7, supporter: "KitchenMaster 台", avatar: "/cooking3.png", totalSupport: 180, isCurrentUser: false, hasOhenPass: false },
		{ rank: 8, supporter: "RecipeLover 美", avatar: "/piano1.png", totalSupport: 150, isCurrentUser: false, hasOhenPass: false },
		{ rank: 9, supporter: "MorningViewer 朝", avatar: "/phone.png", totalSupport: 120, isCurrentUser: false, hasOhenPass: false },
		{ rank: 10, supporter: "BreakfastClub 食", avatar: "/cooking1.png", totalSupport: 100, isCurrentUser: false, hasOhenPass: false },
		{ rank: 11, supporter: "NewSupporter 新", avatar: "/piano2.png", totalSupport: 80, isCurrentUser: false, hasOhenPass: false },
		{ rank: 12, supporter: "RegularViewer 常", avatar: "/cooking3.png", totalSupport: 60, isCurrentUser: false, hasOhenPass: false },
	],
	"music-sister": [
		{ rank: 1, supporter: "MelodyMaster 音", avatar: "/piano1.png", totalSupport: 1200, isCurrentUser: false, hasOhenPass: false },
		{ rank: 2, supporter: "PianoLover 鍵", avatar: "/piano2.png", totalSupport: 980, isCurrentUser: false, hasOhenPass: false },
		{ rank: 3, supporter: "SHIZUKU", avatar: "/shizuku.jpg", totalSupport: 750, isCurrentUser: true, hasOhenPass: false },
		{ rank: 4, supporter: "ClassicalFan 古", avatar: "/piano3.png", totalSupport: 640, isCurrentUser: false, hasOhenPass: false },
		{ rank: 5, supporter: "MusicTheory 理", avatar: "/cooking1.png", totalSupport: 520, isCurrentUser: false, hasOhenPass: false },
	],
	"miyuki": [
		{ rank: 1, supporter: "GamerPro 遊", avatar: "/phone.png", totalSupport: 420, isCurrentUser: false, hasOhenPass: false },
		{ rank: 2, supporter: "VirtualFan 仮", avatar: "/cooking1.png", totalSupport: 380, isCurrentUser: false, hasOhenPass: false },
		{ rank: 3, supporter: "SHIZUKU", avatar: "/shizuku.jpg", totalSupport: 310, isCurrentUser: true, hasOhenPass: false },
		{ rank: 4, supporter: "StreamWatcher 見", avatar: "/piano1.png", totalSupport: 250, isCurrentUser: false, hasOhenPass: false },
	],
};

const getStarDisplay = (starRank: number) => {
	return "★".repeat(starRank) + "☆".repeat(5 - starRank);
};

const getDaysRemaining = (endDate: string) => {
	const end = new Date(endDate);
	const now = new Date();
	const diffTime = end.getTime() - now.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays > 0 ? diffDays : 0;
};

const mockChatMessages: ChatMessage[] = [
	{
		id: "1",
		user: "CryptoWhale 鯨",
		avatar: "/shizuku.jpg",
		message: "Your cooking is amazing! 🍳",
		timestamp: "12:34",
		isSuperchat: false,
	},
	{
		id: "2",
		user: "FoodLover 愛",
		avatar: "/cooking3.png",
		message: "That looks so delicious!",
		timestamp: "12:35",
		isSuperchat: false,
	},
	{
		id: "3",
		user: "SakuraFan 桜",
		avatar: "/piano3.png",
		message: "Thanks for the stream! Keep it up! ✨",
		timestamp: "12:36",
		isSuperchat: true,
		amount: 50,
	},
	{
		id: "4",
		user: "SHIZUKU",
		avatar: "/shizuku.jpg",
		message: "Love your breakfast recipes! 💕",
		timestamp: "12:37",
		isSuperchat: false,
	},
	{
		id: "5",
		user: "CookingFan 料",
		avatar: "/cooking1.png",
		message: "Can you share the recipe?",
		timestamp: "12:38",
		isSuperchat: false,
	},
];

export default function StreamerPage() {
	const params = useParams();
	const streamerId = params.id as string;
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string>("");
	const [supportAmount, setSupportAmount] = useState<number>(50);
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
	const [newMessage, setNewMessage] = useState<string>("");
	const [isLive, setIsLive] = useState<boolean>(true);

	const streamer = mockStreamers[streamerId];
	const supporters = mockSupporterRanking[streamerId] || [];
	const currentUserRank = supporters.find(s => s.isCurrentUser);
	const daysRemaining = getDaysRemaining(streamer?.seasonEndDate || "2024-08-31");

	const connectWallet = async () => {
		setIsWalletConnected(true);
		setWalletAddress("0x1234...5678");
	};

	const disconnectWallet = () => {
		setIsWalletConnected(false);
		setWalletAddress("");
	};

	const handleSupport = () => {
		console.log(`Supporting ${streamer.name} with $${supportAmount}`);
		// スパチャとしてチャットに追加
		const newSuperchat: ChatMessage = {
			id: Date.now().toString(),
			user: "SHIZUKU",
			avatar: "/shizuku.jpg",
			message: `Thanks for the amazing stream! 🌟`,
			timestamp: new Date().toTimeString().slice(0, 5),
			isSuperchat: true,
			amount: supportAmount,
		};
		setChatMessages(prev => [...prev, newSuperchat]);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() && isWalletConnected) {
			const message: ChatMessage = {
				id: Date.now().toString(),
				user: "SHIZUKU",
				avatar: "/shizuku.jpg",
				message: newMessage,
				timestamp: new Date().toTimeString().slice(0, 5),
				isSuperchat: false,
			};
			setChatMessages(prev => [...prev, message]);
			setNewMessage("");
		}
	};

	// 定期的にモックチャットを追加
	useEffect(() => {
		const interval = setInterval(() => {
			const randomMessages = [
				"This stream is so good! 👏",
				"Keep going Sakura! 💪",
				"Love this recipe! 😍",
				"You're amazing! ✨",
				"Best cooking stream ever! 🍳",
			];
			const randomUsers = ["RandomViewer 見", "CookingLover 愛", "StreamFan 応", "FoodieGirl 食"];
			
			const randomMessage: ChatMessage = {
				id: Date.now().toString(),
				user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
				avatar: "/cooking3.png",
				message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
				timestamp: new Date().toTimeString().slice(0, 5),
				isSuperchat: Math.random() > 0.8,
				amount: Math.random() > 0.8 ? Math.floor(Math.random() * 100) + 10 : undefined,
			};
			
			setChatMessages(prev => [...prev.slice(-20), randomMessage]); // 最新20件のみ保持
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	if (!streamer) {
		return <div>Streamer not found</div>;
	}

	const nextRankAmount = currentUserRank && currentUserRank.rank > 1 
		? supporters[currentUserRank.rank - 2].totalSupport - currentUserRank.totalSupport + 1
		: 0;

	const willGetOhenPass = currentUserRank && currentUserRank.rank <= streamer.ohenPassLimit;

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
					{/* ストリーマー情報ヘッダー */}
					<div className="bg-white rounded-xl shadow-lg p-4 mb-6">
						<div className="flex items-center gap-4">
							<Image
								src={streamer.avatar}
								alt={streamer.name}
								width={80}
								height={80}
								className="rounded-full w-20 h-20 object-cover border-4 border-pink-200"
							/>
							<div className="flex-1">
								<div className="flex items-center gap-4 mb-2">
									<h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
										{streamer.name}
									</h2>
									<span className="text-xl" title={`Star ${streamer.starRank}`}>
										{getStarDisplay(streamer.starRank)}
									</span>
									<span className="px-2 py-1 rounded-full text-white font-semibold text-sm" style={{ backgroundColor: "#E8D3F3" }}>
										{streamer.genre}
									</span>
									{isLive && (
										<span className="px-3 py-1 bg-red-500 text-white font-bold text-sm rounded-full animate-pulse">
											🔴 LIVE
										</span>
									)}
								</div>
								<p className="text-gray-600 text-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
									{streamer.description}
								</p>
							</div>
						</div>
					</div>

					{/* メインライブコンテンツ */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
						{/* 左: ライブ配信画面 */}
						<div className="lg:col-span-2">
							<div className="bg-black rounded-xl overflow-hidden shadow-lg">
								<div className="relative aspect-video">
									<Image
										src={streamer.avatar}
										alt="Live Stream"
										fill
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
										<div className="absolute bottom-4 left-4 text-white">
											<p className="text-lg font-bold">Morning Breakfast Cooking 🍳</p>
											<p className="text-sm opacity-90">👥 {streamer.supporterCount} viewers</p>
										</div>
										<div className="absolute top-4 right-4">
											<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
												🔴 LIVE
											</span>
										</div>
									</div>
								</div>
								
								{/* 配信コントロール */}
								<div className="bg-gray-900 p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4">
											<input
												type="number"
												value={supportAmount}
												onChange={(e) => setSupportAmount(Number(e.target.value))}
												min="1"
												className="px-3 py-2 rounded-lg border border-gray-300 w-20 text-black"
											/>
											<span className="text-white text-sm">USD</span>
										</div>
										<button
											onClick={handleSupport}
											disabled={!isWalletConnected}
											className="px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
											style={{ backgroundColor: isWalletConnected ? "#E8D3F3" : "#6B7280" }}
										>
											{isWalletConnected ? "Send 花" : "Connect Wallet"}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* 右: チャット画面 */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
								<div className="p-4 border-b border-gray-200">
									<h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
										Live Chat 💬
									</h3>
								</div>
								
								{/* チャットメッセージ */}
								<div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
									{chatMessages.map((message) => (
										<div key={message.id} className={`flex gap-3 ${message.isSuperchat ? 'bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400' : ''}`}>
											<Image
												src={message.avatar}
												alt={message.user}
												width={32}
												height={32}
												className="rounded-full w-8 h-8 object-cover flex-shrink-0"
											/>
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<span className="font-semibold text-sm text-gray-800 truncate">
														{message.user}
													</span>
													{message.isSuperchat && message.amount && (
														<span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold">
															${message.amount}
														</span>
													)}
													<span className="text-xs text-gray-500 flex-shrink-0">
														{message.timestamp}
													</span>
												</div>
												<p className="text-sm text-gray-700 break-words">
													{message.message}
												</p>
											</div>
										</div>
									))}
								</div>
								
								{/* チャット入力 */}
								<div className="p-4 border-t border-gray-200">
									<div className="flex gap-2">
										<input
											type="text"
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
											placeholder={isWalletConnected ? "Type a message..." : "Connect wallet to chat"}
											disabled={!isWalletConnected}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
										/>
										<button
											onClick={handleSendMessage}
											disabled={!isWalletConnected || !newMessage.trim()}
											className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
										>
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* OHEN PASS競争情報 */}
					{streamer.starRank <= 3 && (
						<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 mb-8">
							<h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
								OHEN PASS 灯 Competition
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
								<div className="text-center">
									<p className="text-2xl font-bold text-purple-600">Top {streamer.ohenPassLimit}</p>
									<p className="text-sm text-gray-600">Get OHEN PASS 灯</p>
								</div>
								<div className="text-center">
									<p className="text-2xl font-bold text-orange-600">{daysRemaining}</p>
									<p className="text-sm text-gray-600">Days Remaining</p>
								</div>
								<div className="text-center">
									{currentUserRank && (
										<>
											<p className="text-2xl font-bold text-blue-600">#{currentUserRank.rank}</p>
											<p className="text-sm text-gray-600">Your Rank</p>
										</>
									)}
								</div>
							</div>
							{currentUserRank && (
								<div className="text-center">
									{willGetOhenPass ? (
										<p className="text-green-600 font-semibold">🎉 You're in OHEN PASS zone! Keep supporting to maintain your position!</p>
									) : nextRankAmount > 0 ? (
										<p className="text-orange-600 font-semibold">💪 Support ${nextRankAmount} more to rank up!</p>
									) : (
										<p className="text-gray-600">Keep supporting to climb the rankings!</p>
									)}
								</div>
							)}
						</div>
					)}

					{/* 下: 投げ銭リーダーボード */}
					<div className="bg-white rounded-xl shadow-lg p-6">
						<h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
							Support Leaderboard 応援
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{supporters.map((supporter, index) => (
								<div
									key={supporter.rank}
									className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
										supporter.isCurrentUser 
											? "bg-blue-50 border-2 border-blue-200" 
											: index < streamer.ohenPassLimit 
												? "bg-green-50" 
												: "bg-gray-50"
									}`}
								>
									<div className="flex items-center gap-2">
										<span className="text-lg font-bold text-gray-800">
											#{supporter.rank}
										</span>
										{index === 0 && <span className="text-lg">🥇</span>}
										{index === 1 && <span className="text-lg">🥈</span>}
										{index === 2 && <span className="text-lg">🥉</span>}
									</div>
									<Image
										src={supporter.avatar}
										alt={supporter.supporter}
										width={40}
										height={40}
										className="rounded-full w-10 h-10 object-cover"
									/>
									<div className="flex-1 min-w-0">
										<p className="font-bold text-gray-800 truncate" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
											{supporter.supporter}
											{supporter.isCurrentUser && (
												<span className="ml-1 text-blue-600">(You)</span>
											)}
										</p>
										<div className="flex items-center gap-2">
											<p className="text-sm font-semibold text-gray-600">${supporter.totalSupport}</p>
											{supporter.rank <= streamer.ohenPassLimit && (
												<span className="px-2 py-0.5 text-xs rounded-full text-white font-semibold" style={{ backgroundColor: "#4CAF50" }}>
													OHEN PASS 灯
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}