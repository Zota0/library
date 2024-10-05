"use client";

import React, { useEffect, useState } from "react";
import AddBook from "./add";

export default function TabSwitcher() {
	const tabs = ["add", "edit", "delete"];
    const savedTab: string|null = localStorage.getItem("currentTab")
		? localStorage.getItem("currentTab")
		: "add";

	const [currentTab, setCurrentTab] = useState<string>(
        savedTab ?? "add"
	);

	useEffect(() => {
		localStorage.setItem("currentTab", currentTab);
	}, [currentTab]);

	const TabView = () => {
		switch (currentTab) {
			case "edit":
				return <div>EDIT</div>;
			case "delete":
				return <div>DEL</div>;
			case "add":
			default:
				return <AddBook />;
		}
	};
	const CachedTabView = React.memo(() => <TabView />);
	CachedTabView.displayName = "Cached Tab View";

	return (
		<div className='center flex-col w-screen h-full'>
			<header className='center w-screen h-12 bg-black gap-x-8 mb-8'>
				{tabs.map((tab, index) => (
					<button
						key={index}
						type='button'
						onClick={() => setCurrentTab(tab)}
						className={`
                            px-8 py-2 rounded-xl ring-2 ${
							currentTab === tab
								? "ring-blue-600 bg-blue-800 text-slate-200"
								: "ring-gray-900 bg-black text-slate-400"
						}`}
					>
						{tab}
					</button>
				))}
			</header>
			<div className='center w-[95%] min-h-36 rounded-2xl h-full bg-opacity-75 bg-yellow-400 mx-8 m-32'>
				<CachedTabView />
			</div>
		</div>
	);
}
