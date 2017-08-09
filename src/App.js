import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
  }

  /**
   * TODO: Refactor searchBooks to use the books
   * instead of results. This should fix the
   * problem with results not updating state.
  */

  componentDidMount() {
    this.getBooks()
  }

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

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((results) => {
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
        <Route exact path="/search" render={() => (
          <SearchBooks results={this.state.results} onSearch={this.searchBooks} changeBookself={this.changeBookself} />
        )} />

        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} changeBookself={this.changeBookself} />
        )} />
      </div>
    )
  }
}

export default BooksApp
