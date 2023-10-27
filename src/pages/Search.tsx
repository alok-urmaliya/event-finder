import React, { ChangeEvent } from 'react'
import '../styles/Search.css'

const Search = () => {
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
        <div className="search-page">
            <div className="search-container">
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search-form--keyword"
                        name='keyword'
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className="search-form--distance"
                        name='distance'
                        onChange={handleChange}
                    />

                    <select
                        id="favColor"
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="null">Default</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Arts">Arts & Theatre</option>
                        <option value="Film">Film</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>

                    <input
                        type="text"
                        className="search-form--keyword"
                        name='location'
                        onChange={handleChange}
                    />

                    <input
                        type='checkbox'
                        id='auto-detect-location'
                        className='search-form--autolocation'
                        checked={formData.autoDetectLocation}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='auto-detect-location'>
                        Auto-Detect your location
                    </label>

                    <button
                        className='search-form--submit'>
                        Submit
                    </button>

                    <button
                        type='button'
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Search;