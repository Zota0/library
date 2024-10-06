"use client";

import dynamic from 'next/dynamic'


export default function Page() {
	
    const View = dynamic(() => import('./client_page'), {ssr: true});

    return (
		<div className='center flex-col w-screen h-full'>
			<header className='center w-screen h-12 bg-black gap-x-8 mb-8'></header>
			<div className='center w-[95%] min-h-36 rounded-2xl h-full bg-opacity-75 bg-yellow-400 mx-8 m-32'>
				<View />
			</div>
		</div>
	);
}
