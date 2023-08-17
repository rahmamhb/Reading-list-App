import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOOK, getBookQuery } from "../queries/queries";
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState,useEffect} from "react";
function BookDetails({bookId , Isopen}) {

  const { loading, error, data } = useQuery(getBookQuery , {
    variables :{
      id : bookId ,
    },
    skip: !bookId,
  });
  const [open , setOpen] = useState(Isopen)
  useEffect(() => {
    setOpen(Isopen); // Update the open state when Isopen prop changes
  }, [Isopen]);
  const [deleteBook] = useMutation(DELETE_BOOK)
  const handleClick = ()=>{
    deleteBook({variables : { id : bookId }, refetchQueries : [{query : getBookQuery}]})
    .then((result)=>{
      console.log("book deleted succesfully " , result.data.deleteBook)
    })
    .catch((error)=>{
      console.log("error detected ",error.message)
    })
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No book selected ....</div>;
  }
  if(!data.book){
    return <div>No book selected ....</div>
  }
  return (
    <div className={`book-details ${open ? "" : "closed"}`}>
      <span className="DoubleArrow" onClick={()=>{setOpen(false)}}><KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon></span>
      <div>
        <div className="header">
          <h2>{ data.book.name }</h2>
          <a onClick={handleClick} href="/"><DeleteIcon></DeleteIcon></a>
        </div>
        <p>{ data.book.genre }</p>
        <p>{ data.book.author.name }</p>
        <p>All books by this author:</p>
        <ul className="other-books">
            { data.book.author.books.map(item => {
                return <li key={item.id}>{item.name }</li>
            })}
        </ul>
      </div>
    </div>
      
  );
  
  
}

export default BookDetails;
