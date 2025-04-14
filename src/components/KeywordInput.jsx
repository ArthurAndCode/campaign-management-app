import { useState, useEffect } from 'react';

export default function KeywordInput({ allKeywords, defaultKeywords = [] }) {
    const [input, setInput] = useState('');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSelected(defaultKeywords);
    }, [defaultKeywords]);

    const filtered = allKeywords.filter(k =>
        k.toLowerCase().includes(input.toLowerCase()) && !selected.includes(k)
    );

    const addKeyword = (k) => {
        setSelected(prev => [...prev, k]);
        setInput('');
    };

    const removeKeyword = (k) => {
        setSelected(prev => prev.filter(item => item !== k));
    };

    return (
        <div className="">
            <input
                type="text"
                placeholder="Type to search keywords"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
            />
            {input && (
                <ul className="border border-gray-500 bg-gray-700 max-h-40 overflow-auto rounded mt-2">
                    {filtered.map(k => (
                        <li
                            key={k}
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-gray-200"
                            onClick={() => addKeyword(k)}
                        >
                            {k}
                        </li>
                    ))}
                </ul>
            )}
            {selected.map(k => <input key={k} type="hidden" name="keywords" value={k} />)}
            <div className="flex flex-wrap gap-2 mt-2">
                {selected.map(k => (
                    <span
                        key={k}
                        className="flex items-center bg-gray-600 text-gray-200 text-sm px-3 py-2 rounded-full space-x-2"
                    >
                        <span>{k}</span>
                        <button
                            type="button"
                            onClick={() => removeKeyword(k)}
                            className="w-2 h-2 flex items-center justify-center text-2xs rounded-full hover:text-red-500 transition"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
