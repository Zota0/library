"use client";

import React, { useEffect, useState } from "react";
import { SelectSearch } from "@/components/select"; // Adjust path as needed
import { length } from './../../../../node_modules/stylis/src/Tokenizer';

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    publisher: string;
    isbn: string;
    pages: number;
}

export default function View() {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const GetBooks = async () => {
        try {
            const res = await fetch(`/back/api/auth/get-books?token=test`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const ans = await res.json();
            if(ans.status === "error") {
                throw new Error(ans.message);
            } else {
                setBooks(ans.data);
            }
        } catch(error) {
            console.error("Error fetching books:", error);
            // Handle error appropriately (e.g., display an error message)
        }
    };

    useEffect(() => {
        GetBooks();
    }, []);

    return (
        <div>
            <h2>Books</h2>
            <select
                autoComplete="on"
                name="book"
                title="Select a book"
            >
                <option disabled selected>Wybierz książkę</option>
                {
                    (books && books.length > 0) ? books.map(book => (
                        <option
                            key={book.id}
                            value={book.id}
                        >
                        <>
                            <span className="option-title">
                                {book.title}
                            </span> - <span className="option-author">{book.author}</span>
                        </>
                        </option>
                    )) : null
                }
            </select>
        </div>
    );
};