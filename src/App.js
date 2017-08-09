import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
    results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookself = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map(function(b) {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      })
    }))

    BooksAPI.update(book, shelf);
  }

  searchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query, 20).then((results) => {
        if (Array.isArray(results) && results.length) {
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
        }
      })
    } else {
      this.setState({results: []})
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={this.state.books} onSearch={this.searchBooks} results={this.state.results} changeBookself={this.changeBookself} />
        ) : (
          <ListBooks books={this.state.books} changeBookself={this.changeBookself} />
        )}
      </div>
    )
  }
}

export default BooksApp
