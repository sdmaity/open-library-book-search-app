import React from 'react';
import BookTable from './bookTable';


//Component for the Search bar and Search button
function Searchbar(props) {
    function handleChange(e) {
        props.setSearchKey(e.target.value);
    }
    
    return (
        <form onSubmit={props.handleSubmit}>
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

//Total book search app
//api returns 100 max data in 1 api call, we are showing 10 in a page and after showing the initial 100
//calling the api for next 100 data
export default function BookSearch(props) {
    const pageDataLength = 10; //showing 10 data per page
    const [result, setResult] = React.useState(null);
    const [apiPage, setApiPage] = React.useState(1);
    const [pageNo, setPageNo] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    //handles pagination click if the request goes out of stored books calls api for the next set of 100 data
    function handlePaginationClick(next = true) {
        if (next) {
            let currentResultLength = result.docs.length;
            if ((pageNo + 1) * pageDataLength > currentResultLength) {
                apiCall(apiPage + 1);
            } else {
                setPageNo(pageNo + 1);
            }
        } else {
            setPageNo(pageNo - 1)
        }
    }

    //api call for fetching books data
    //we are searching using book title this can be expanded fr searching using author, text, subject etc
    //we pass only title and page no. in the request
    function apiCall(page, reset = false) {
        setLoading(true);
        setApiPage(page);
        fetch('http://openlibrary.org/search.json?title="' + encodeURI(searchKey) + '"&page=' + page)
        .then(res => res.json())
        .then(
            (response) => {
                setLoading(false);
                if (!reset && result && result.docs.length) {
                    //adding to existing data set of books in case of pagination
                    result.docs = result.docs.concat(response.docs);
                    response = result;
                }
                setResult(response);
                setPageNo(reset ? 1 : (pageNo + 1));
            },
            (error) => {
                setLoading(false);
                console.log(error);
            }
        );
    }

    //event for handling when user cicks search
    //calls api and resets the storage
    function handleSearch(e) {
        e.preventDefault();
        apiCall(1, true);
    }

    return (
        <div>
            <h1>Open Library Book Search</h1>
            <Searchbar setSearchKey={setSearchKey} searchKey={searchKey} handleSubmit={handleSearch}/>
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