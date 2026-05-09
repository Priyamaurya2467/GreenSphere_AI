export default function Footer() {
	return (
		<footer className="border-t border-[#e5ece7] bg-white py-10">
			<div className="mx-auto flex max-w-7xl justify-between px-6">
				<div>
					<h2 className="text-2xl font-bold text-[#184a3c]">
						GreenSphere AI
					</h2>

					<p className="mt-3 text-[#5d6d65]">
						AI-powered sustainability platform.
					</p>
				</div>

				<div className="flex gap-6 text-sm text-[#5d6d65]">
					<a href="#">Privacy</a>
					<a href="#">Terms</a>
					<a href="#">API</a>
				</div>
			</div>
		</footer>
	);
}