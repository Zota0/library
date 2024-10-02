"use client";
import React, { useEffect, useState } from 'react';

interface book {
    id: number;
    
    title: string;
    author: string;
    
    genre: string;
    publisher: string;

    isbn: string;

    pages: number;
}


export default function Home() {
    const [token, SetToken] = useState<any>(null);
    const [books, SetBooks] = useState<book[]|null>(null);

    useEffect(() => {
        async function getToken() {
            const res = await(await fetch("/api/auth/get-token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 2,
                }
            })).json();
            console.log(res)
            SetToken(res.data);
        }
        getToken();
    }, []);

    useEffect(() => {
        if (token) {
            async function getBooks() {
                const books = await(await fetch(`/api/auth/get-books?token=${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    next: {
                        revalidate: 2,
                    }
                })).json();
                console.log(books);
                SetBooks(books.data);
            }
            getBooks();
        }
    }, [token])

    return (
		<div className='grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>

            {
                (books && books.length > 0) ? books.map((book: book, idx: number) => (
                    <div key={idx}>
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <p>{book.genre}</p>
                        <p>{book.publisher}</p>
                        <p>{book.isbn}</p>
                        <p>{book.pages}</p>
                    </div>
                )) : null
            }
        </div>
	);
}



