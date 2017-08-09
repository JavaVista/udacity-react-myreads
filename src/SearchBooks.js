import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    results: PropTypes.array,
    changeBookself: PropTypes.func.isRequired
  }

  /**
   * TODO: When changing a book's shelf from search
   * the results state does not update. It might be
   * better to use the books state to be the results
   * state.
   * TODO: Add the ability select the max number of
   * results pulled back. Currently this is hard coded.
   **/

  render() {
    const { onSearch, results, changeBookself } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="Search by title or author"/>
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
  changeBookself: PropTypes.func.isRequired
}

export default SearchBooks
