import React, { ChangeEvent } from 'react'
import '../styles/Search.css'
import SearchForm from '../components/SearchForm'
import EventsList from '../components/EventsList'

const Search = () => {
    return (
        <div className='search-page'>
            <SearchForm />
            <EventsList />
        </div>
    )
}

export default Search;