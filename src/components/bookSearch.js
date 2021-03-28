import React from 'react';
import BookTable from './bookTable';


//Component for the Search bar and Search button
function Searchbar(props) {
    const [searchKey, setSearchKey] = React.useState('');
    function handleChange(e) {
        setSearchKey(e.target.value);
    }
    
    function handleSearch(e) {
        e.preventDefault();
        props.setLoading(true);
        fetch('http://openlibrary.org/search.json?title="' + encodeURI(searchKey) + '"&page=' + 1)
        .then(res => res.json())
        .then(
            (response) => {
                props.setLoading(false);
                props.setResult(response);
            },
            (error) => {
                props.setLoading(false);
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

//Component for pagnation portion of the app
function Pagination(props) {
    return (
        <div className="pagination">
            {props.pageNo > 1 && <button onClick={() => props.handlePaginationClick(false)}>Prev</button>}
            <button>{props.pageNo}</button>
            {props.pageNo < props.maxPageNo && <button onClick={props.handlePaginationClick}>Next</button>}
        </div>
    );
}

export default function BookSearch(props) {
    const pageDataLength = 10; //showing 10 data per page
    const [result, setResult] = React.useState(null);
    const [pageNo, setPageNo] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    function handlePaginationClick(next = true) {
        if (next) {
            setPageNo(pageNo + 1);
        } else {
            setPageNo(pageNo - 1)
        }
    }

    return (
        <div>
            <h1>Open Library Book Search</h1>
            <Searchbar setResult={setResult} setLoading={setLoading}/>
            {loading ? (<h1>Loading...</h1>) : (result && (result.docs.length ? (<>
                <BookTable books={result.docs.slice((pageNo-1)*pageDataLength, pageNo*pageDataLength)}/>
                <Pagination 
                    maxPageNo={Math.ceil(+result.numFound/pageDataLength)} 
                    pageNo={pageNo}
                    handlePaginationClick={handlePaginationClick}
                />
            </>) : <h2>No Result Found</h2>))}
        </div>
    );
}