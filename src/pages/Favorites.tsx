import React from "react";
import { MdDelete } from "react-icons/md";
import '../styles/Favorites.css'

const Favorites = () => {
    const [favoriteList, setFavoriteList] = React.useState<any[]>()
    const [favoriteEventElements, setFavoriteEventElements] = React.useState<any[]>()

    React.useEffect(() => {
        const favoriteListString = localStorage.getItem('favoriteList')
        const tempFavoriteList = favoriteListString != null ? JSON.parse(favoriteListString) : []
        setFavoriteList(tempFavoriteList)
    }, [])

    React.useEffect(() => {
        const tempFavoriteEventElements = favoriteList && favoriteList.map((data) => {
            let count = 1
            return (
                <div className="favorite-page-item" key={data?.id}>
                    <p className='favorite-page--item-field'>{count++}</p>
                    <p className='favorite-page--item-field'>{data?.date}</p>
                    <p className='favorite-page--item-field'>{data?.event}</p>
                    <p className='favorite-page--item-field'>{data?.genre}</p>
                    <p className='favorite-page--item-field'>{data?.venue}</p>
                    <p className='favorite-page--item-icon' onClick={() => deleteFromFavorites(data.id)}><MdDelete /></p>
                </div>
            )
        })
        setFavoriteEventElements(tempFavoriteEventElements)
    }, [favoriteList])

    function deleteFromFavorites(key: string) {
        const tempFavoriteList = favoriteList?.filter(item => item.id != key)
        setFavoriteList(tempFavoriteList)
        localStorage.setItem('favoriteList', JSON.stringify(tempFavoriteList))
    }

    return (
        <div className="favorites-page">
            <div className="favorite-page--container">
                <div className="favorite-page--headings">
                    <h4 className="favorite-page--heading">#</h4>
                    <h4 className="favorite-page--heading">Date/Time</h4>
                    <h4 className="favorite-page--heading">Event</h4>
                    <h4 className="favorite-page--heading">Genre</h4>
                    <h4 className="favorite-page--heading">Venue</h4>
                    <h4 className="favorite-page--heading">Favorite</h4>

                </div>
                {favoriteEventElements}
            </div>
        </div>
    )
}

export default Favorites;