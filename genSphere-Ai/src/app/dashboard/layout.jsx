import Sidebar from "@/components/common/Sidebar";

export default function DashboardLayout({ children }) {
	return (
		<div className="flex min-h-screen bg-[#f6f8f6]">
			<Sidebar />

			<div className="flex-1 p-8">
				{children}
			</div>
		</div>
	);
}