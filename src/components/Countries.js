import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import MealService from '../services/MealService';


function Countries(props) {

    const [countries, setCountries] = useState([]);
    const [countriesRows, setCountriesRows] = useState([]);
    const [countriesRows3, setCountriesRows3] = useState([]);
    const [loaded, setLoaded] = useState(false);



    useEffect(async() => {
        const countriesRes = await MealService.getCountries();
        const gotCountries = countriesRes.data.meals;
        const gotCountriesRows = [];
        for (let i=0; i<Math.ceil(gotCountries.length); i+=4) {
            gotCountriesRows.push(gotCountries.slice(i,i+4));
        }
        const gotCountriesRows3 = [];
        for (let i=0; i<Math.ceil(gotCountries.length); i+=3) {
            gotCountriesRows3.push(gotCountries.slice(i,i+3));
        }
        setCountries(gotCountries);
        setCountriesRows(gotCountriesRows);
        setCountriesRows3(gotCountriesRows3);
        setLoaded(true);
    }, [])

    return (
        <div className="container pt-3">
        {
            loaded
            ?   <div>
                <div className="d-lg-none d-xl-block">
                {
                    countriesRows.map(row => {
                        return (
                            <div className="row">
                            {row.map(country => {
                                return (
                                    <div className="col-sm-6 col-xl-3 mt-3">
                                        <CountryCard country={country} />
                                    </div>
                                )
                                })}
                            </div>
                        )
                    })
                }
                </div>
                <div className="d-none d-lg-block d-xl-none">
                {
                    countriesRows3.map(row => {
                        return (
                            <div className="row">
                            {row.map(country => {
                                return (
                                    <div className="col-4 mt-3">
                                        <CountryCard country={country} />
                                    </div>
                                )
                                })}
                            </div>
                        )
                    })
                }
                </div>
                </div>

            : <div className="position-absolute text-dark top-0 bottom-0 start-0 end-0 my-loading d-flex flex-column align-items-center justify-content-center">
                <div className="my-loading-content d-flex flex-column align-items-center">
                    <div class="spinner-border my-loading-spinner" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p className="h2 my-loading-caption mt-3">Loading...</p>
                </div>
            </div>
        }
        </div>
    )
}

export default Countries;