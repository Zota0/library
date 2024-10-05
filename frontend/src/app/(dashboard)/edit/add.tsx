"use client";

export default function AddBook() {
    async function HandleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const elements = e.currentTarget?.elements;
            if(!elements || elements.length <= 0) throw new Error("No form elements found");

            const title = (elements.namedItem("title") as HTMLInputElement)?.value ?? "Tytul Pierwszy";
            const author = (elements.namedItem("author") as HTMLInputElement)?.value ?? "Jan Kowalski";
            
            const res = await fetch(`/back/api/auth/add-book?token=test`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title: title, author: author }),
            });

            const ans = await res.json();
            console.log("Backend response: ", ans);
            if (ans.status === "error") {
                alert("Error: " + ans.message);
                throw new Error("Error: " + ans.message);
            } else {
                alert("Success!");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
		<div className='center w-full h-full'>
			<form
				onSubmit={HandleForm}
				className='px-4 py-2 grid grid-cols-2 grid-flow-row w-full h-full'
			>
				<div className='group-lab_ip'>
					<label htmlFor='ip_title'>Tytuł</label>
					<input
						type='text'
						placeholder='Tytuł książki'
						name='title'
						id='ip_title'
						required
					/>
				</div>

				<div className='group-lab_ip'>
					<label htmlFor='ip_author'>Autor</label>
					<input
						type='text'
						placeholder='Imię i nazwisko autora'
						name='author'
						id='ip_author'
						required
					/>
				</div>

				<div className='group-lab_ip'>
					<label htmlFor='ip_genre'>Gatunek</label>
					<select
						name='genre'
						id='ip_genre'
						required
					>
                        <option
                            value="---"
                            disabled
                            selected
                        >Wybierz gatunek
                        </option>
                        <option value="dramat">Dramat</option>
                        <option value="romans">Romans</option>
                    </select>
				</div>

				<div className='group-lab_ip'>
					<label htmlFor='ip_publisher'>
						Wydawca{"     "}
						<span className='input-optional'>(opcjonalne)</span>
					</label>
					<input
						type='text'
						placeholder='Wydawca książki'
						name='publisher'
						id='ip_publisher'
					/>
				</div>

				<div className='group-lab_ip'>
					<label htmlFor='ip_pages'>
                        Liczba stron{"     "}
                        <span className='input-optional'>(opcjonalne)</span>
                        </label>
					<input
						type='number'
						defaultValue='0'
						placeholder='Pages'
						name='pages'
						id='ip_pages'
					/>
				</div>

				<div className='group-lab_ip'>
					<label htmlFor='ip_isbn'>ISBN</label>
					<input
						type='text'
						placeholder='Kod isbn książki'
						name='isbn'
						id='ip_isbn'
					/>
				</div>

				<div className='col-span-full center'>
					<button className='h-[80%] w-[50%]' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}