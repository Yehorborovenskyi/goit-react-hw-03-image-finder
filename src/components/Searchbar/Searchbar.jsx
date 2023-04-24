import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import React, { Component } from 'react';

export  class SearchBar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    const input = e.currentTarget.value;
    this.setState({ input });
  };
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.search.value;
    this.props.onSubmit({ input });
  };

  render() {
    return (
     <header className={css.Searchbar}>
     <form className={css.SearchForm} onSubmit={this.handleSubmit}>
      <button type="submit" className={css.SearchFormButton}>
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>

      <input
      className={css.SearchFormInput}
      onChange={this.handleChange}
      type="text"
      autocomplete="off"
      autoFocus
      name="search"
      placeholder="Search images and photos"
       
      />
    </form>
  </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};