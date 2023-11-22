import React from "react";
import { MdDelete } from "react-icons/md";
import '../styles/Favorites.css'
import { FavoriteEvent } from "../utils";

const Favorites = () => {
    const [favoriteEventElements, setFavoriteEventElements] = React.useState<any[]>()

    React.useEffect(() => {
        const favoriteList = getFavoriteList();
        setFavoriteGridItems(favoriteList);
    }, [])

    function getFavoriteList() {
        const favoriteListString = localStorage.getItem('favoriteList')
        const favoriteList: FavoriteEvent[] = favoriteListString != null ? JSON.parse(favoriteListString) : []
        return favoriteList;
    }

    function setFavoriteGridItems(favoriteList: FavoriteEvent[]) {
        const tempFavoriteEventElements = favoriteList && favoriteList.map((data) => {
            return (
                <div className="favorite-page-item" key={data.index}>
                    <p className='favorite-page--item-field'>{data.index}</p>
                    <p className='favorite-page--item-field'>{data.date}</p>
                    <p className='favorite-page--item-field'>{data.event}</p>
                    <p className='favorite-page--item-field'>{data.genre}</p>
                    <p className='favorite-page--item-field'>{data.venue}</p>
                    <p className='favorite-page--item-icon' onClick={() => deleteFromFavorites(data.id)}><MdDelete /></p>
                </div>
            )
        })
        setFavoriteEventElements(tempFavoriteEventElements)
    }

    function deleteFromFavorites(key: string) {
        const favoriteList = getFavoriteList();
        const tempFavoriteList = favoriteList?.filter(item => item.id != key)
        setFavoriteGridItems(tempFavoriteList)
        localStorage.setItem('favoriteList', JSON.stringify(tempFavoriteList))
    }

    return (
        <div className="favorites-page">
            {favoriteEventElements?.length && favoriteEventElements?.length > 0 ? (<div className="favorite-page--container">
                <div className="favorite-page--headings">
                    <h4 className="favorite-page--heading">#</h4>
                    <h4 className="favorite-page--heading">Date/Time</h4>
                    <h4 className="favorite-page--heading">Event</h4>
                    <h4 className="favorite-page--heading">Genre</h4>
                    <h4 className="favorite-page--heading">Venue</h4>
                    <h4 className="favorite-page--heading">Favorite</h4>

                </div>
                {favoriteEventElements}
            </div>) : (
                <div className="favorite-page-empty">
                    No records available!
                </div>
            )}
        </div>
    )
}

export default Favorites;