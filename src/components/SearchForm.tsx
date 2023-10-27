import React from 'react'
import '../styles/SearchForm.css'

const SearchForm = () => {
    const [formData, setFormData] = React.useState({
        keyword: "",
        distance: "",
        category: "",
        location: "",
        autoDetectLocation: false
    });

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log("submit request!")
    }

    function handleChange(event: any) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleClear() {
        console.log("clear form!")
    }

    return (
        <div className="search-form">
            <h1 className="search-form--title">Search Form</h1>
            <hr />
            <form className='search-form-container' onSubmit={handleSubmit}>

                <div className="search-form--keyword">
                    <p className="label">Keyword</p>
                    <input
                        type="text"
                        name='keyword'
                        className='search-form--keyword--text'
                        onChange={handleChange}
                    />
                </div>

                <div className="search-form--distance">
                    <p className="label">Distance (miles)</p>
                    <input
                        type="text"
                        name='distance'
                        className='search-form--distance--text'
                        onChange={handleChange}
                    />
                </div>

                <div className="search-form--category">
                    <p className="label">Category</p>
                    <select
                        id="favColor"
                        name='category'
                        className='search-form--category--select'
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Default</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Arts">Arts & Theatre</option>
                        <option value="Film">Film</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                </div>

                <div className="search-form--location">
                    <p className="label">Location</p>
                    <input
                        type="text"
                        name='location'
                        className='search-form--location--text'
                        onChange={handleChange}
                    />
                </div>

                <div className="search-form--autolocation">
                    <input
                        type='checkbox'
                        id='auto-detect-location'
                        className='search-form--autolocation--checkbox'
                        checked={formData.autoDetectLocation}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='auto-detect-location'
                        className='label'>
                        Auto-Detect your location
                    </label>
                </div>

                <div className="search-form--buttons">
                    <button
                        className='search-form--submit button'>
                        Submit
                    </button>
                    <button
                        type='button'
                        className='search-form--clear button'
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;