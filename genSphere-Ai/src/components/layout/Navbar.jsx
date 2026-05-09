"use client";

import {Link} from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="fixed top-0 w-full z-50 bg-emerald-100 backdrop-blur-lg border-b border-white/20 shadow-[0px_10px_30px_rgba(47,93,80,0.08)] ">
			<div className="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
				<Link
					href="/"
					className="font-['Sora'] text-['Sora'] font-bold text-[#154539ff] tracking-tight"
				>
					GreenSphere AI
				</Link>

				<div className="hidden gap-6 md:flex items-center">
					<Link to ="/" className="text-[#404945] font-medium hover:text-[#154539ff] text-base leading-6 font-normal ">Home</Link>
					<Link to ="/ecosnap" className="text-[#404945] font-medium hover:text-[#154539ff] text-base leading-6 font-normal ">EcoSnap</Link>
					<Link to ="/aqi"  className="text-[#404945] font-medium hover:text-[#154539ff] text-base leading-6 font-normal ">Carbon Whistler</Link>
					
					
				</div>

				{/* <div className="flex items-center gap-6">
					<button className="material-symbols-outlined text-[#15439ff] p-2 hover:bg-[#154539] rounded-full transition-all"> Search</button>
					<button className=" bg-black px-6 py-2 rounded-full text-sm font-medium hover:bg-[#154539] text-white">Get Started</button>
			    </div> */}
			</div>
		</nav>
	)
}
		
	

///text-on-surface variant 