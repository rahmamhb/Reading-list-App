import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  let [selectedBookId , setSelectedBookId] = useState(null)
  let [query , setQuery] = useState("")
  let [selectedGenre , setSelectedGenre] = useState("all") 
  let [Open , setOpen] = useState(true)


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <input type="text" placeholder="Search ..." value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
      <select value={selectedGenre} onChange={(e)=>{setSelectedGenre(e.target.value)}} className="genre-select">
          <option value={"all"}>All</option>
          {[...new Set(data.books.map(book => book.genre))].map((genre,index)=>{
              return(
                  <option key={index} value={genre}>{genre}</option>
              )
          })}
      </select>
      <ul id="book-list">
        {data.books.filter(book=>book.name.toLowerCase().includes(query)&&
        (selectedGenre === "all" || book.genre === selectedGenre))
        .map((book) => (
          <li key={book.id} onClick={()=>{setSelectedBookId(book.id) ; setOpen(true)}} >{book.name}</li>
        ))}
      </ul>
      <BookDetails bookId = {selectedBookId} Isopen={true}></BookDetails>
    </div>
  );
  
  
}

export default BookList;

