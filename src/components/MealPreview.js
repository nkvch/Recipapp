import React, { useState, useEffect } from 'react';
import MealService from '../services/MealService';
import { useId } from 'react-id-generator';

function MealPreview(props) {

    const [ingrListId] = useId();
    const [clicked, setClicked] = useState(false);

    const ingredients = MealService.getIngredients(props.meal);
    const measures = MealService.getIngMes(props.meal);
    const instructions = props.meal.strInstructions.length < 200 ? props.meal.strInstructions : props.meal.strInstructions.slice(0,200);
    const linkToMeal = '/meal/'+props.meal.idMeal;

    return (
        <div className="card mb-3 my-card">
            {
                clicked
                ?  <div className="position-absolute text-dark top-0 bottom-0 start-0 end-0 my-preview-loading d-flex flex-column align-items-center justify-content-center">
                    <div className="my-loading-content d-flex flex-column align-items-center">
                        <div class="spinner-border my-loading-spinner" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p className="h2 my-loading-caption mt-3">Loading...</p>
                    </div>
                    </div>
                : null
            }
            {
                props.meal.strTags
                ?   <div className="card-header">
                        <ul className="list-inline mb-0">
                            {props.meal.strTags.split(',').map(tag =>
                                <li className="list-inline-item"><a className="text-decoration-none link-secondary" href="#">{tag}</a></li>)}
                        </ul>
                    </div>
                : null
            }
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 stretchable">
                    <img className="img-fluid" src={props.meal.strMealThumb} />
                    <a className="stretched-link" onClick={() => setClicked(true)} href={linkToMeal}></a>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-6">
                    <div className="card-body h-100 d-grid">
                        <div className="stretchable pb-4">
                            <h2 className="card-title mb-3">{props.meal.strMeal}</h2>
                            <h6 className="card-subtitle text-muted">{props.meal.strCategory + ', ' + props.meal.strArea}</h6>
                            <a className="stretched-link" onClick={() => setClicked(true)} href={linkToMeal}></a>
                        </div>
                        <div className="d-grid semi-stretchable-holder">
                            <div>
                                <a className="ingredients-expand" data-bs-toggle="collapse" href={'#'+ingrListId}
                                aria-expanded="false" aria-controls={ingrListId}>Show Ingredients</a>
                            </div>
                            <div className="container-fluid stretchable">
                                <a className="stretched-link" onClick={() => setClicked(true)} href={linkToMeal}></a>
                            </div>
                        </div>
                        <ul className="list-group mt-3 list-group-numbered list-group-flush collapse stretchable"
                        id={ingrListId}>
                            {
                                ingredients.map(ing => 
                                    <li className="list-group-item small">{ing + ' - ' + measures[ing]}</li>
                                )
                            }
                            <a className="stretched-link" onClick={() => setClicked(true)} href={linkToMeal}></a>
                        </ul>
                        <div className="stretchable fluid pt-2">
                            <p className="card-text text-muted">{instructions+'...'}</p>
                            <a className="stretched-link" onClick={() => setClicked(true)} href={linkToMeal}></a>
                        </div>
                        <div className="d-grid semi-stretchable-holder">
                            <div>
                                {props.meal.strSource ? <a href={props.meal.strSource}>See recepie in the source</a> : null}
                            </div>
                            <div className="container-fluid stretchable">
                                <a className="stretched-link" onClick={() => setClicked(true)} href={linkToMeal}></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


export default MealPreview;