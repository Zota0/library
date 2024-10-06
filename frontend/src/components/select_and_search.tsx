import { useState, useEffect, useRef } from "react";

export interface Item {
    id: number;
    label: string;
}

export interface props_SelectAndSearch {
    selected: (id: number | null) => void;
    name: string;
    values: Item[];
    disabled: boolean;
    inputPlaceholder: string;
}

export const SelectAndSearch = ({ selected, name, values, disabled, inputPlaceholder }: props_SelectAndSearch) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    // Notify parent about selected item
    useEffect(() => {
        selected(selectedId);
    }, [selectedId, selected]);

    // Normalize input to match values
    const normalizeString = (str: string): string => {
        return str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g, "");
    };

    // Handle typing in input field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        const normalizedValue = normalizeString(value);

        if(normalizedValue.trim() === "") {
            setSelectedId(null); // Reset selection when input is cleared
        } else {
            const matchedItem = values.find((item) =>
                normalizeString(item.label).includes(normalizedValue)
            );
            setSelectedId(matchedItem ? matchedItem.id : null); // Update selectedId
        }
    };

    // Handle selecting an option from dropdown
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        setSelectedId(selectedId);
        const selectedItem = values.find((item) => item.id === selectedId);
        if(selectedItem) {
            setInputValue(selectedItem.label); // Sync input field with selected option
        }
    };

    return (
        <div className="relative">
            <div className="flex">
                {/* Input field */}
                <input
                    type="text"
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={inputPlaceholder}
                    disabled={disabled}
                    name={name}
                    className="w-1/2"
                />
                {/* Select dropdown */}
                <select
                    ref={selectRef}
                    value={selectedId !== null ? selectedId : ""}
                    onChange={handleSelectChange}
                    disabled={disabled}
                    className="ml-2 w-2/3"
                    name={`select-${name}`}
                    title={`Wybierz`}
                >
                    <option value="" disabled>{inputPlaceholder}</option>
                    {values.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
