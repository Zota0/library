"use client";

import dynamic from 'next/dynamic'


export default function Page() {
	
    const View = dynamic(() => import('./tab-switcher'), {ssr: false});

    return <View/>
}
