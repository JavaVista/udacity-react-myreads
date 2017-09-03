import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  /*
   * books: the books currently in your library
   * results: the search results returned from the web service.
   */
  state = {
    books: [],
    results: []
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

        return {
          books: state.books,
          results: state.results.map(function(b) {
            if (b.id === book.id) {
              b.shelf = shelf;
            }
            return b;
          })
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
  * @getBooks
  * Gets the current books on the shelves from the web service
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

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks results={this.state.results} onSearch={this.searchBooks} changeBookself={this.changeBookself} clearSearch={this.clearSearch} />
        )} />

        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} changeBookself={this.changeBookself} />
        )} />
      </div>
    )
  }
}

export default BooksApp
