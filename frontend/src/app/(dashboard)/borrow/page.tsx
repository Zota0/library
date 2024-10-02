"use client";

export default function Page() {

    async function HandleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const elements = e.currentTarget?.elements;
        
        const title = elements?.namedItem("title")?.value ?? "";
        const author = elements?.namedItem("author")?.value ?? "";
        const genre = elements?.namedItem("genre")?.value ?? "";

        const publisher = elements?.namedItem("publisher")?.value ?? "";
        const pages = elements?.namedItem("pages")?.value ?? 0;
        const isbn = elements?.namedItem("isbn")?.value ?? "";
        const formData = JSON.stringify({
            "title": title,
            "author": author,
            "genre": genre,
            
            "publisher": publisher,
            "pages": pages,
            "isbn": isbn,
        });

        console.log(formData);

        try {
            const res = await fetch("/api/auth/add-book?token=test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formData,
            });
            
            if(!res.ok) {
                throw new Error("Error: Could'nt add a book to database");
            }
            
            const ans = await res.json();
            console.log(ans);
            if(ans.status == "error") {
                alert("Error: " + ans.message);
                throw new Error("Error: " + ans.message);
            } else {
                alert("Success!");
            }
        } catch(error) {
            console.error("Error: ", error);
        }
    }

    return (
		<div className='center'>
            <form
                onSubmit={(e) => {
                    HandleForm(e)
                }}
                className="p-16 w-[70%] h-full bg-yellow-900"
            >
                <input type="text" placeholder="Title" name="title" required />

                <button type="submit">Submit</button>
            </form>
		</div>
	);
}
