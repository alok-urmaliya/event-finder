import React from 'react'
import '../styles/SearchForm.css'
import EventHelper from '../EventHelper';
import EventService from '../EventService';
import { FormData } from '../utils';

const SearchForm = () => {
    enum Category {
        Music = "KZFzniwnSyZfZ7v7nJ",
        Sports = "KZFzniwnSyZfZ7v7nE",
        ArtsTheatre = "KZFzniwnSyZfZ7v7na",
        Film = "KZFzniwnSyZfZ7v7nn",
        Miscellaneous = "KZFzniwnSyZfZ7v7n1",
        Default = ""
    }

    const [formData, setFormData] = React.useState(new FormData("", "", Category.Default, "", false))

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log("submit request!")
        const payload: any = EventHelper.getEventRequestPayload(formData);

        //This is our action for now
        console.log(formData)
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
        setFormData({
            keyword: "",
            distance: "",
            category: "",
            location: "",
            autoDetectLocation: false
        });
    }

    return (
        <div className="search-form">
            <h1 className="search-form--title">Events Search</h1>
            <hr />
            <form className='search-form-container' onSubmit={handleSubmit}>

                <div className="search-form--keyword">
                    <p className="label">Keyword</p>
                    <input
                        type="text"
                        name='keyword'
                        required
                        className='search-form--keyword--text text-input'
                        onChange={handleChange}
                        value={formData.keyword}
                    />
                </div>

                <div className="search-form--distance">
                    <p className="label">Distance (miles)</p>
                    <input
                        type="text"
                        name='distance'
                        className='search-form--distance--text text-input'
                        onChange={handleChange}
                        value={formData.distance}
                    />
                </div>

                <div className="search-form--category">
                    <p className="label">Category</p>
                    <select
                        id="favColor"
                        name='category'
                        required
                        className='search-form--category--select text-input'
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value={Category.Default}>Default</option>
                        <option value={Category.Music}>Music</option>
                        <option value={Category.Sports}>Sports</option>
                        <option value={Category.ArtsTheatre}>Arts & Theatre</option>
                        <option value={Category.Film}>Film</option>
                        <option value={Category.Miscellaneous}>Miscellaneous</option>
                    </select>
                </div>

                <div className="search-form--location">
                    <p className="label">Location</p>
                    <input
                        type="text"
                        name='location'
                        required={true}
                        className='search-form--location--text text-input'
                        onChange={handleChange}
                        value={formData.location}
                        disabled={formData.autoDetectLocation ? true : false}
                    />
                </div>

                <div className="search-form--autolocation">
                    <input
                        type='checkbox'
                        id='auto-detect-location'
                        name='autoDetectLocation'
                        className='search-form--autolocation--checkbox'
                        onChange={handleChange}
                        checked={formData.autoDetectLocation}
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
            </form >
        </div >
    )
}

export default SearchForm;