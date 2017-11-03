import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    results: PropTypes.array,
    query: PropTypes.string,
    changeBookself: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
  }

  render() {
    const { results, query, changeBookself, onSearch, history } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => {
            this.props.clearSearch()
            history.goBack()
          }}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" value={query} onChange={(e) => onSearch(e.target.value.trim()) } placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.length > 0 && (results.map((result) =>
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
  onSearch: PropTypes.func.isRequired,
  results: PropTypes.array,
  query: PropTypes.string,
  changeBookself: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired
}

export default SearchBooks
