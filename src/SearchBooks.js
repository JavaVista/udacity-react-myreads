import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    results: PropTypes.array,
    changeBookself: PropTypes.func.isRequired
  }

  render() {
    const { books, onSearch, results, changeBookself } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {typeof results !== 'undefied' && results.length > 0 && (results.map((result) =>
              <li key={result.id}>
                <Book book={result} onShelfChange={changeBookself} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  results: PropTypes.array,
  changeBookself: PropTypes.func.isRequired
}

export default SearchBooks
