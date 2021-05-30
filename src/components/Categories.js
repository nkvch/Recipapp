import React, { useState, useEffect } from 'react';
import MealService from '../services/MealService';
import CategoryCard from './CategoryCard';
import NoneFound from './nonfunctional/NoneFound';

function Categories(props) {

    const [categories, setCategories] = useState([]);
    const [catRows, setCatRows] = useState([]);
    const [catRows3, setCatRows3] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(async() => {
        const catRes = await MealService.getCategories();
        const gotCats = catRes.data.categories;
        const gotCatRows = [];
        for (let i=0; i<Math.ceil(gotCats.length); i+=4) {
            gotCatRows.push(gotCats.slice(i,i+4));
        }
        const gotCatRows3 = [];
        for (let i=0; i<Math.ceil(gotCats.length); i+=3) {
            gotCatRows3.push(gotCats.slice(i,i+3));
        }
        setCategories(gotCats);
        setCatRows(gotCatRows);
        setCatRows3(gotCatRows3);
        setLoaded(true);
    }, [])


    return (
        <div className="container pt-3">
        {
            loaded
            ?   <div>
                <div className="d-lg-none d-xl-block">
                {
                    catRows.map(row => {
                        return (
                            <div className="row">
                            {row.map(category => {
                                return (
                                    <div className="col-sm-6 col-xl-3 mt-3">
                                        <CategoryCard category={category} />
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
                    catRows3.map(row => {
                        return (
                            <div className="row">
                            {row.map(category => {
                                return (
                                    <div className="col-4 mt-3">
                                        <CategoryCard category={category} />
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

export default Categories;