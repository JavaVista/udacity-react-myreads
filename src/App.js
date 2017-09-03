import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import BookDetails from './BookDetails'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

/*
TODO: Create a Book details page
  TODO: Create back button for BookDetails
  TODO: Check for large image
 */

class BooksApp extends React.Component {


  /*
   * books: the books currently in your library
   * results: the search results returned from the web service.
   * book: the current book being view on details page
   */
  state = {
    books: [],
    results: [],
    book: {},
    query: ""
  }

  componentWillMount() {
    this.resetBook()
  }

  componentDidMount() {
    this.getBooks()
  }

  /*
  * @changeBookself
  * Updates the App State for both books and results. This is necessary to keep
  * them in sync.
  * The web service Update method is called.
  */
  changeBookself = (book, shelf) => {
    this.setState(function(state) {
        const index = state.books.findIndex((b) => book.id === b.id)

        if (index !== -1) {
          state.books[index].shelf = shelf
        } else {
          book.shelf = shelf
          state.books.push(book)
        }

        if (book.id === state.book.id) {
          console.log(state.book.id);
          state.book.shelf = book.shelf;
        }

        return {
          books: state.books,
          results: state.results.map(function(b) {
            if (b.id === book.id) {
              b.shelf = shelf;
            }
            return b;
          }),
          book: state.book
        }
    })

    BooksAPI.update(book, shelf)
  }

  /*
  * @getBooks
  * Gets the current books on the shelves from the web service
  */
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /*
  * @getBookById
  * Finds a book in State based on the id parameter.
  * If found, returns a book object, else false
  */
  getBook = (id) => {
    BooksAPI.get(id).then((book) => {
      this.setState({book});
    });
  }

  /*
  * @resetBook
  * Resets the book state to be an empty
  */
  resetBook = () => {
    this.setState({book: {
      "id": null,
      "shelf": null,
      "title": null,
      "authors": null,
      "imageLinks": {"thumbnail":null},
      "industryIdentifiers": []
    }})
  }

  /*
  * @clearSearch
  * Clears the search results from the search page.
  */
  clearSearch = () => {
    this.setState({results: []})
  }

  /*
  * @searchBooks
  * Gets the search results from the API using user's query
  * Updates the results bookshelf using the books in State before passing
  * the results to the State.
  */
  searchBooks = (query) => {
    //set query string to state
    this.setState({query: query})
    
    if (query.length > 0) {
      BooksAPI.search(query).then((results) => {
        if (!results.error) {
          this.setState((state) => ({
            results: results.map(function(result) {
              for (const book of state.books) {
                if (book.id === result.id) {
                  result.shelf = book.shelf
                }
              }
              return result;
            })
          }))
        } else {
          this.setState({results: []})
        }
      })
    } else {
      this.setState({results: []})
    }
  }

  Book = ({match}) => {
    if (!this.state.book) {
      this.getBook(match.params.id)
    }

    return <h1>{this.state.book.title}</h1>
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks results={this.state.results} query={this.state.query} onSearch={this.searchBooks} changeBookself={this.changeBookself} clearSearch={this.clearSearch} />
        )} />

        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} changeBookself={this.changeBookself} />
        )} />

        <Route exact path="/details/:id" render={({match}) => (
          <BookDetails book={this.state.book} onShelfChange={this.changeBookself} match={match} getBook={this.getBook} resetBook={this.resetBook} />
        )} />

      </div>
    )
  }
}

export default BooksApp
