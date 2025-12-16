import React, { ReactElement, useEffect, useState } from "react";

const AutoComplete = (): ReactElement => {
    type Option = {
        word: string;
        score: number;
    }

    const [keyword, setKeyword] = useState('')
    const [options, setOptions] = useState<Option[]>([])
    const fetchOptions = async (keyword) => {
        const url = `https://api.datamuse.com/sug?s=${keyword}`
        const data = await fetch(url);
        if (!data.ok) throw new Error(`HTTP ${data.status}`);
        const json = await data.json()
        return json
    }
    useEffect(() => {
        if (!keyword) return;
        const getData = setTimeout(() => {
            fetchOptions(keyword).then(setOptions).catch(console.error)
        }, 300)
        return () => clearTimeout(getData)
    }, [keyword])
    const onChange = (e) => {
        setKeyword(e.target.value)
    }
    return <div className="auto-complete-wrapper">
        <input className="auto-complete-input" value={keyword} onChange={onChange} />
        {keyword && options && <div className="auto-complete-options">
            {options.map(option => <button
                className="auto-complete-option"
                onClick={() => setKeyword(option.word)}
                key={option.word}
            >{option.word}</button>)}
        </div>}
    </div>
}

export default AutoComplete;
