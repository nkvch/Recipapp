import React, { useEffect, useState } from 'react';
import MealService from '../services/MealService';
import xsImage from '../images/xs.png';
import sImage from '../images/s.png'
import mImage from '../images/m.png';
import lImage from '../images/l.png';
import ingredSelect from '../images/ingrs.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';



function MainScreen(props) {

    const RecepieCarousel = function(props) {

        const [meals, setMeals] = useState(Array(10).fill({}));
        const [loaded, setLoaded] = useState(false);

        useEffect(async() => {
            const reqs = meals.map(() => MealService.randomMeal());
            Promise.all(reqs).then((ress) => setMeals(ress.map(res => res.data.meals[0]))).then(() => setLoaded(true));
        }, []);


        const applyBackground = function(meal) {
            return `url(`+meal.strMealThumb+`)`;
        }


        return (
            <div id="recepieCarousel" className="carousel slide my-carousel" data-bs-ride="carousel">
                <div className="carousel-inner">
                {
                    loaded
                    ? null
                    : <div className="position-absolute text-light top-0 bottom-0 start-0 end-0 my-loading d-flex flex-column align-items-center justify-content-center">
                        <div className="my-loading-content d-flex flex-column align-items-center">
                            <div class="spinner-border my-loading-spinner" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p className="h2 my-loading-caption mt-3">Loading...</p>
                        </div>
                    </div>
                }
                    <div className="carousel-item active my-carousel-item">
                        <div className="my-carousel-background-image"  style={{ backgroundImage: applyBackground(meals[0])}}></div>
                        <div className="container">
                            <h1>{meals[0].strMeal}</h1>
                            <p className="text-truncate">{meals[0].strInstructions}</p>
                        </div>
                        <a className="stretched-link" href={'/meal/'+meals[0].idMeal}></a>
                    </div>
                    {meals.slice(1).map(meal => 
                        <div className="carousel-item my-carousel-item">
                            <div className="my-carousel-background-image"  style={{ backgroundImage: applyBackground(meal)}}></div>
                            <div className="container">
                                <h1>{meal.strMeal}</h1>
                                <p className="text-truncate">{meal.strInstructions}</p>
                            </div>
                            <a className="stretched-link" href={'/meal/'+meal.idMeal}></a>
                        </div>
                    )}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#recepieCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#recepieCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        )
    }

    const IngredientsWidget = function() {

        const [portions, setPortions] = useState(1);

        var Fraction = require('fractional').Fraction;

        const formatMeasure = function(str) {
            const symbols = {
                '¼': ' 1/4',
                '½': ' 1/2',
                '¾': ' 3/4'
            };
            if (str && portions != 1) {
                str = str.replace(/[¼½¾]/g,function(match)  {console.log(match); return symbols[match]});
                str = str.replace(/\d\s\s+\d\/\d/g, (match) => match.replace(' ',''));
                if (/\d\s\d\/\d/g.test(str)) {
                    str = str.replace(/(\d\s\d\/\d)|(\d+)/g, function(match)  {console.log(match); return Fraction(match).multiply(portions)});
                } else if (/\d\/\d/g.test(str)) {
                    str = str.replace(/\d\/\d/g, (match) => '0 '+match);
                    str = str.replace(/(\d\s\d\/\d)|(\d+)/g, function(match)  {console.log(match); return Fraction(match).multiply(portions)});
                } else {
                    str = str.replace(/\d+/g, function(match)  {console.log(match); return Fraction(match).multiply(portions)});
                }
                str = str.match(/\d/) ? str : str + ' x ' + portions; 
            }
            return str
        }

        const Tooltip = function() {
            return (
                <div>
                    <p className="h6 mt-3">Cook as much as you need</p>
                    <hr></hr>
                    <p>Choose the amount of the meal <strong>(e.g. 1.5x)</strong>, and ingredients amounts will get counted automatically.</p>
                </div>
            )
        }
        return(
            <div className="card mt-4">
                <div className="card-header d-flex justify-content-between">
                    <h5 className="card-title mt-4">Ingredients</h5>
                    <div>
                        <span>Portions</span>
                        <Tippy content={<Tooltip/>}>
                            <select class="form-select form-select-sm"
                            onChange={(event) => {setPortions(event.target.value)}} >
                                <option value="0.5">x 0.5</option>
                                <option value="0.75">x 0.75</option>
                                <option value="1" selected="true">x 1</option>
                                <option value="1.5">x 1.5</option>
                                <option value="2">x 2</option>
                                <option value="2.5">x 2.5</option>
                                <option value="3">x 3</option>
                                <option value="4">x 4</option>
                                <option value="5">x 5</option>
                            </select>
                        </Tippy>
                    </div>
                </div>
                <ul className="card-body list-group list-group-numbered list-group-flush">
                        <li className="list-group-item small">{ "Sardines - " + formatMeasure("8") }</li>
                        <li className="list-group-item small">{ "Olive Chilli - " + formatMeasure("2 tbs") }</li>
                        <li className="list-group-item small">{ "Garlic - " + formatMeasure("3 cloves") }</li>
                        <li className="list-group-item small">{ "Paprika - " + formatMeasure("¾") }</li>
                        <li className="list-group-item small">{ "Lemon - " + formatMeasure("1/2") }</li>
                        <li className="list-group-item small">{ "Rosemary - " + formatMeasure("4 springs") }</li>
                        <li className="list-group-item small">{ "Red Chilli - " + formatMeasure("1") }</li>
                </ul>
            </div>
        )
    }

    return (
        <>
        <RecepieCarousel />
        <div className="container mt-5">
            <div class="accordion my-accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Welcome to Recipapp!
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <p><strong>All recepies in one app</strong></p>
                    <p>Choose from recepies from multiple sources, checkout video instructions, or if you want go see recepie directly in the source</p>
                    <img className="d-md-none" src={xsImage} alt="Screenshot from application"/>
                    <img className="d-none d-md-block d-lg-none" src={sImage} alt="Screenshot from application"/>
                    <img className="d-none d-lg-block d-xl-none " src={mImage} alt="Screenshot from application"/>
                    <img className="d-none d-xl-block" src={lImage} alt="Screenshot from application"/>
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Our features
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div className="row">
                            <div className="col-sm-4 col-md-6">
                                <p><strong>Don't need to count</strong></p>
                                <p>Select number of portions and get each ingredient's amount counted</p>    
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <IngredientsWidget />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        What technologies we use ?
                    </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>Recipapp is a React app using Bootstrap v5.0 for styling.</strong>
                        <div className="row mt-3">
                            <div className="col-sm-7 col-md-6">
                                <p>The application is build with React using React Hooks. All components are function-components.</p>    
                            </div>
                            <div className="col-sm-5 col-md-6 d-flex justify-content-center position-relative react-column">
                                <a>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                                    alt height="40" />
                                    <span className="react-brand ms-2">React</span>
                                    <a className="stretched-link" href='https://reactjs.org/'></a>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-md-6">
                                <p>Bootstrap v5.0 is on styling. Recipapp is Mobile-First responsive web-app, which renders perfectly on any screen.</p>    
                            </div>
                            <div className="col-sm-5 col-md-6  d-flex justify-content-center position-relative react-column">
                                <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" class="my-1" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="#6610f2"></path></svg>
                                <span className="bootstrap-brand ms-2">Bootstrap</span>
                                <a className="stretched-link" href='https://getbootstrap.com/'></a>
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )


}

export default MainScreen;