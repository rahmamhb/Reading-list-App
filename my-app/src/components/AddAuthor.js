import { useMutation } from "@apollo/client";
import { getAuthorQuery ,ADD_AUTHOR} from "../queries/queries";
import { useState } from "react";


function AddAuthor() {
  const [addAuthor] = useMutation(ADD_AUTHOR);
  let [authorName , setAuthorName] = useState("")
  let [authorAge , setAuthorAge] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    addAuthor(
        {   variables: { name: authorName,
                         age : parseInt(authorAge,10),
                        },
                        refetchQueries : [{query : getAuthorQuery}]
        })
      .then((result) => {
        console.log('author added successfully:', result.data.addAuthor);
      })
      .catch((error) => {
        console.error('Error adding author:', error.message);
      });
    setAuthorName("")
    setAuthorAge("")

  };
  
  return (
    <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Author name:</label>
            <input type="text" value={authorName} onChange={(e)=>{ setAuthorName(e.target.value)}}/>
        </div>    
        <div className="field">
            <label>age:</label>
            <input type="number" value={authorAge} onChange={(e)=>{ setAuthorAge(e.target.value)}}/>
        </div>
        <button>+</button>
   </form>
  );
  
}

export default AddAuthor;

