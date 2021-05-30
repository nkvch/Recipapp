import React, { useState, useEffect } from 'react';
import MealService from '../services/MealService';
import MealPreview from './MealPreview';
import NoneFound from './nonfunctional/NoneFound';
import { withRouter } from 'react-router-dom';

function Meals(props) {

    const [foundMeals, setMeals] = useState([]);
    const [loaded, setLoaded] = useState(false);
    console.log(props);

    useEffect(async() => {
        console.log(props);
        const findRes = props.match.params.searchingFor 
        ? await MealService.findByName(props.match.params.searchingFor)
        : props.match.params.category 
        ? await MealService.findByCategory(props.match.params.category)
        : await MealService.findByCountry(props.match.params.country);
        
        if (props.match.params.category) {
            const getByIdPromises = findRes.data.meals.map(meal => MealService.findById(meal.idMeal));
            Promise.all(getByIdPromises).then((ress) => {setMeals(ress.map(res => res.data.meals[0]))})
        } else if (props.match.params.country) {
            const getByIdPromises = findRes.data.meals.map(meal => MealService.findById(meal.idMeal));
            Promise.all(getByIdPromises).then((ress) => {setMeals(ress.map(res => res.data.meals[0]))})
        } else {
            setMeals(findRes.data.meals);
        }
        setLoaded(true);
    },[props.match.params]);

    
    
    return (

        <div className="container pt-3">
            {
                loaded
                ? null
                : <div className="position-absolute text-dark top-0 bottom-0 start-0 end-0 my-loading d-flex flex-column align-items-center justify-content-center">
                    <div className="my-loading-content d-flex flex-column align-items-center">
                        <div class="spinner-border my-loading-spinner" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p className="h2 my-loading-caption mt-3">Loading...</p>
                    </div>
                </div>
            }
            {foundMeals ? foundMeals.map(meal => <MealPreview meal={meal} />) : <NoneFound />}
        </div>
        
    )
}

export default withRouter(Meals);