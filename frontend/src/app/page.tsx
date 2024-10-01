"use client";
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [token, SetToken] = useState<any>();

    useEffect(() => {
        async function getToken() {
            const token = await(await fetch("/api/auth/get-token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 12,
                }
            })).json();
            SetToken(token);
        }
        getToken();
    }, []);    
    console.log(token);

    return (
		<div className='grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>

            {token ? token.data : null}
        </div>
	);
}



