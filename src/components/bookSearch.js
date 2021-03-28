import React from 'react';
import BookTable from './bookTable';


function Searchbar(props) {
    const [searchKey, setSearchKey] = React.useState('');
    function handleChange(e) {
        setSearchKey(e.target.value);
    }
    
    function handleSearch(e) {
        e.preventDefault();
        fetch('http://openlibrary.org/search.json?title="' + encodeURI(searchKey) + '"&page=' + 1)
        .then(res => res.json())
        .then(
            (response) => {
                props.setResult(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="Enter book name" value={props.searchKey} onChange={handleChange}/>
            <button type="submit">Search</button>
        </form>
    );
}

export default function BookSearch(props) {
    const [result, setResult] = React.useState(null);
    return (
        <div>
            <h1>Open Library Book Search</h1>
            <Searchbar setResult={setResult} />
            {result && result.docs.length && <BookTable books={result.docs.slice(0, 11)}/>}
        </div>
    );
}