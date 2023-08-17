import './index.css';
import BookList from"./components/BookList"
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';
function App() {
  return (
    <div className="App">
      <h1>My reading list</h1>
      <BookList></BookList>
      <AddAuthor></AddAuthor>
      <AddBook></AddBook>
    </div>
  );
}

export default App;
