export default function HomePage() {
	return (
		<section className="relative overflow-hidden">
			
			{/* Background Glow */}
			<div className="hero-gradient absolute inset-0"></div>

			<div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10">
				
				{/* Left Content */}
				<div className="relative z-10">
					
					{/* Badge */}
					<div className="inline-flex items-center gap-2 rounded-full bg-[#d8efe0] px-5 py-2 text-sm font-semibold text-[#184a3c]">
						<span>🌱</span>
						Pioneering Sustainability
					</div>

					{/* Heading */}
					<h1 className="mt-8 max-w-xl text-5xl font-extrabold leading-tight tracking-tight text-[#184a3c] md:text-7xl">
						AI for a Greener and Smarter Future
					</h1>

					{/* Description */}
					<p className="mt-8 max-w-lg text-lg leading-9 text-[#5d6d65]">
						GreenSphere AI integrates precision environmental
						intelligence with advanced machine learning to
						safeguard our planet’s ecosystems and climate systems.
					</p>

					{/* Buttons */}
					<div className="mt-10 flex flex-wrap gap-5">
						<button className="green-shadow rounded-full bg-[#184a3c] px-8 py-4 text-sm font-semibold text-white transition hover:scale-105">
							Explore Dashboard
						</button>

						<button className="rounded-full border border-[#d6dfd8] bg-white px-8 py-4 text-sm font-semibold text-[#184a3c] transition hover:bg-[#f1f5f2]">
							Track Environment
						</button>
					</div>
				</div>

				{/* Right Visual */}
				<div className="relative flex items-center justify-center">
					
					{/* Outer Glow */}
					<div className="absolute h-[450px] w-[450px] rounded-full bg-[#dff2e6] opacity-70 blur-3xl"></div>

					{/* Main Circle */}
					<div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full border border-[#d7e7dc] bg-white/50 shadow-2xl backdrop-blur-xl">
						
						{/* Inner Circle */}
						<div className="flex h-[320px] w-[320px] items-center justify-center rounded-full border border-[#dfe9e2] bg-gradient-to-br from-[#edf7f0] to-white">
							
							<div className="text-center">
								<h2 className="text-3xl font-bold text-[#184a3c]">
									3D Interactive Core
								</h2>

								<p className="mt-4 text-[#5d6d65]">
									Environmental Intelligence
								</p>
							</div>
						</div>

						{/* Floating Icons */}
						<div className="absolute left-0 top-1/2 flex h-16 w-16 -translate-x-8 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-lg">
							☁️
						</div>

						<div className="absolute right-0 top-1/2 flex h-16 w-16 translate-x-8 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-lg">
							💨
						</div>

						<div className="absolute bottom-0 left-1/2 flex h-16 w-16 -translate-x-1/2 translate-y-8 items-center justify-center rounded-2xl bg-white shadow-lg">
							💧
						</div>

						<div className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-8 items-center justify-center rounded-2xl bg-white shadow-lg">
							♻️
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}