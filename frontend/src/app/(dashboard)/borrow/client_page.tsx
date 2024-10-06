"use client";

import React, { useEffect, useState } from "react";
import { SelectAndSearch } from "@/components/select_and_search";

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
    const [selectedBook, setSelectedBook] = useState<number | null>(null);

    // Fetch books from the API
    const getBooks = async () => {
        try {
            const res = await fetch(`/back/api/auth/get-books?token=test`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
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

    // Fetch books when component mounts
    useEffect(() => {
        getBooks();
    }, []);

    // Map books to values for SelectAndSearch
    const values = books.map((book) => ({
        label: `${book.title} - ${book.author}`,
        id: book.id,
    }));

    return (
        <div>
            <SelectAndSearch
                selected={(id) => setSelectedBook(id)}
                values={values}
                disabled={false}
                inputPlaceholder="Wyszukaj i wybierz książkę"
                name="book"
            />

            {/* Display selected book details if a book is selected */}
            {selectedBook !== null && (
                <div>
                    <h2>Selected Book Details:</h2>
                    {books
                        .filter((book) => book.id === selectedBook)
                        .map((book) => (
                            <div key={book.id}>
                                <p>Title: {book.title}</p>
                                <p>Author: {book.author}</p>
                                <p>Genre: {book.genre}</p>
                                <p>Publisher: {book.publisher}</p>
                                <p>ISBN: {book.isbn}</p>
                                <p>Pages: {book.pages}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
