import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Generated by create next app",
};

export default function Page() {

    return (
        <div className="center">
            <div className="h-full w-full grid grid-rows-2 grid-cols-2 grid-flow-row gap-8 p-8">
                <Link href="/books" tabIndex={1} className="navbox">
                    <span>Lista książek</span>
                </Link>
                <Link href="/borrow" tabIndex={2} className="navbox">
                    <span>Wypożycz</span>
                </Link>
                <Link href="/return" tabIndex={3} className="navbox">
                    <span>Oddaj</span>
                </Link>
                <Link href="/edit" tabIndex={4} className="navbox">
                    <span>Modyfikuj</span>
                </Link>
            </div>
        </div>
    );
}