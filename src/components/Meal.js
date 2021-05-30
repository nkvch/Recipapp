import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MealService from '../services/MealService';
import { create, all } from 'mathjs';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

var Fraction = require('fractional').Fraction;


function Meal(props) {

    const [meal, setMeal] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [measures, setMeasures] = useState({});

    useEffect(async() => {
        const findByIdRes = await MealService.findById(props.match.params.id);
        const gotMeal = findByIdRes.data.meals[0];
        setMeal(gotMeal);
        setIngredients(MealService.getIngredients(gotMeal));
        setMeasures(MealService.getIngMes(gotMeal));
    }, [props.match.params.id]);

    const IngredientsWidget = function() {

        const [portions, setPortions] = useState(1);

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
                        {
                            ingredients.map(ing => 
                                <li className="list-group-item small">{ing + ' - ' + formatMeasure(measures[ing]) }</li>
                            )
                        }
                </ul>
            </div>
        )
    }

    const ytOpts = {
        width: 280,
        height: 170,
        playerVars: {
            autoplay: 0,
        }
    }
    
    const _onReady = function(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    const Instruction = function() {
        return (
            <div className="card">
            <div className="card-header">
                <h5 className="card-title">Instruction</h5>
                <p className="card-subtitle text-muted">Consider personal measures counted</p>
            </div>
            <div className="card-body">
            
            <p align="justify">
                {meal.strInstructions}
            </p>
            </div>
            </div>
        )
    }

    return (
        <div className="container mt-4 meal-container">
            <div className="row">
                <div className="col-sm col-lg-4 order-sm-last">
                    <div className="d-none d-sm-block">
                        <h1>{meal.strMeal}</h1>
                        <div className="d-none d-sm-block">
                            <IngredientsWidget />
                        </div>
                        <div className="card d-none d-sm-block mt-4">
                            <div className="card-header">
                                <h5 className="card-title">Links</h5>
                            </div>
                            <div className="d-flex flex-column p-3">
                                <p>Check out video-instruction</p>
                                <div className="align-self-center mt-3">
                                    <YouTube videoId={getYouTubeID(meal.strYoutube)} opts={ytOpts} onReady={_onReady} />
                                </div>
                                <a className="mt-3" href={meal.strSource}>See recepie in the source</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm col-lg-8 order-sm-first">
                    <div className="mb-4 d-sm-none">
                        <h1>{meal.strMeal}</h1>
                    </div>
                    <img className="img-fluid" src={meal.strMealThumb}></img>
                    <div className="d-sm-none">
                        <IngredientsWidget />
                    </div>
                    <div className="mt-4">
                        <Instruction />
                    </div>
                    <div className="card d-sm-none mt-4">
                            <div className="card-header">
                                <h5 className="card-title">Links</h5>
                            </div>
                            <div className="d-flex flex-column p-3">
                                <p>Check out video-instruction</p>
                                <div className="align-self-center mt-3">
                                    <YouTube videoId={getYouTubeID(meal.strYoutube)} opts={ytOpts} onReady={_onReady} />
                                </div>
                                <a className="mt-3" href={meal.strSource}>See recepie in the source</a>
                            </div>
                        </div>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Meal);