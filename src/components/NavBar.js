import React, { useState, useEffect } from 'react';
import MealService from '../services/MealService';
import { Link , Redirect, useHistory } from "react-router-dom";
import Meals from './Meals';

function NavBar() {

    const [searchingFor, setSearching] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [loadedOptions, setLoadedOptions] = useState(true);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        setDropdownOptions([]);
        history.push('/found-matches/'+searchingFor);
    }

    async function handleChange(event) {
        setLoadedOptions(false);
        const currentlySearchingFor = event.target.value;
        setSearching(currentlySearchingFor);
        const findByNameRes = await MealService.findByName(currentlySearchingFor);
        const meals = currentlySearchingFor.trim().length > 0 ? findByNameRes.data.meals : [];
        const mealNames = meals ? meals.map(meal => meal.strMeal) : [];
        const dropdownItems = mealNames.length == 1 && currentlySearchingFor === mealNames[0] ? [] : mealNames;
        setDropdownOptions(dropdownItems);
        setLoadedOptions(true);
    }

    return (
        <nav className="navbar sticky-top navbar-light navbar-expand-md px-3">
            <a className="navbar-brand link-dark header-brand" href="/">Recipapp</a>
            <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false" 
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-md-flex justify-content-md-between"
            id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/categories" className="nav-link link-dark">Categories</Link></li>
                    <li className="nav-item"><Link to="/countries" className="nav-link link-dark">Countries</Link></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle link-dark"
                        id="navbarDropdown" 
                        role="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                          Main categories  
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/categories/Dessert">Deserts</a></li>
                            <li><a className="dropdown-item" href="/categories/Breakfast">Breakfast</a></li>
                            <li><a className="dropdown-item" href="/categories/Seafood">Seafood</a></li>
                        </ul>
                    </li>
                </ul>
                <form onSubmit={handleSubmit} className="d-flex my-search-bar position-relative">
                    <input className="form-control me-2 dropdown-toggle" type="search"
                    placeholder="Search for meal" aria-label="Search" 
                    value={searchingFor}
                    onChange={(event) => handleChange(event)}
                    onFocus={(event) => handleChange(event)}
                    > 
                    </input>
                    {
                        loadedOptions
                        ? null
                        :   <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-end">
                                <div class="spinner-border spinner-border-sm my-search-loading-spinner" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }

                    <button className="btn btn-outline-dark" type="submit" disabled={!searchingFor}>
                        Search
                    </button>
                    <ul class="my-search-options list-group position-absolute top-100">
                        {dropdownOptions.slice(0,5).map(option => 
                            <li className="list-group-item p-0">
                            <button type="button" onClick={() => {setSearching(option); handleChange({target: {value: option}})}} className="my-dropdown-search-item">
                                <p className="m-0">{option}</p>
                            </button>
                            </li>
                        )}
                    </ul>
                </form>
            </div>
        </nav>
    )
}


export default NavBar;