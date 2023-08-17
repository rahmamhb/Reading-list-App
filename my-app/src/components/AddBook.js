import { useQuery , useMutation } from "@apollo/client";
import { getAuthorQuery , addBookMutation , getBooksQuery} from "../queries/queries";
import { useState } from "react";


function AddBook() {
  const { loading, error, data } = useQuery(getAuthorQuery);
  const [addBook , {BookData, bookLoading, bookError}] = useMutation(addBookMutation);
  let [bookName , setBookName] = useState("");
  let [bookGenre , setBookGenre] = useState("");
  let [authorId , setAuthorId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(
        {   variables: { name: bookName,
                       genre: bookGenre,
                       authorId },
            refetchQueries : [{query : getBooksQuery}]
    
        })
      .then((result) => {
        console.log('Book added successfully:', result.data.addBook);
      })
      .catch((error) => {
        console.error('Error adding book:', error.message);
      });
    setBookName("")
    setBookGenre("")
    setAuthorId("")
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" value={bookName} onChange={(e)=>{ setBookName(e.target.value)}}/>
        </div>    
        <div className="field">
            <label>Genre:</label>
            <input type="text" value={bookGenre} onChange={(e)=>{ setBookGenre(e.target.value)}}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={(e)=>{ setAuthorId(e.target.value)}}>
                <option>Select Author</option>
                {
                    data.authors.map(author =>{
                        return(<option key={author.id} value={author.id}>{author.name}</option>)
                    })
                }
            </select>
        </div>
        <button>+</button>
        {bookLoading && <p>Loading...</p>}
        {bookError && <p>Error: {bookError.message}</p>}
   </form>


  );
  
  
}

export default AddBook;

