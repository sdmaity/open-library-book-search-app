import React from 'react';
import './bookSearch.css';


//Single row of dissplaying book info
//cover picture if available, book title, book author(s), published year, subjects 
function BookRow(props) {
    return (
        <tr>
            <td>
            <a target="_blank" rel="noreferrer" href={"https://openlibrary.org/" + props.book.key + "/?edition=" + (props.book.ia ? props.book.ia[0] : '')}>
                <img itemProp="image" src={props.book.cover_edition_key ? "https://covers.openlibrary.org/b/olid/" + props.book.cover_edition_key + "-M.jpg" : "https://openlibrary.org/images/icons/avatar_book-sm.png"} alt={"Cover of: " + props.book.title} title={"Cover of: " + props.book.title}/>
            </a>
            </td>
            <td><a target="_blank" rel="noreferrer" href={"https://openlibrary.org/" + props.book.key + "/?edition=" + (props.book.ia ? props.book.ia[0] : '')}>{props.book.title}</a></td>
            <td>{props.book.author_name && props.book.author_name.map((author, i) => (
                <a key={props.book.author_key[i]} target="_blank" rel="noreferrer" href={"https://openlibrary.org/authors/" + props.book.author_key[i]}>{author}</a>
            )).reduce(( prev, curr ) => ([ prev, ', ', curr ]))}</td>
            <td>{props.book.publish_year && props.book.publish_year.join(', ')}</td>
            <td>{props.book.subject && props.book.subject.join(', ')}</td>
        </tr>
    );
}

//Table componet for showing list of books
//only gets list of books to show in props
export default function BookTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{width: '10%'}}></th>
                    <th style={{width: '10%'}}>Book Name</th>
                    <th style={{width: '20%'}}>Author(s)</th>
                    <th style={{width: '10%'}}>Published</th>
                    <th style={{width: '40%'}}>Subjects</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.books.map(book => <BookRow key={book.key} book={book}/>)
                }
            </tbody>
        </table>
    );
}