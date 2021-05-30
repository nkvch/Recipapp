import React, { useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link , Redirect } from "react-router-dom";


function CategoryCard(props) {

    const [clicked, setClicked] = useState(false);
    const category = props.category;
    

    return (
        <div className="card my-category-card" style={{ height: 'fit-content' }}>
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
        <img src={category.strCategoryThumb} className="card-img-top mt-3" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{category.strCategory}</h5>
            <p className="card-text category-description">
                {category.strCategoryDescription}
            </p>
        </div>
        <a className="stretched-link" onClick={() => setClicked(true)} href={'/categories/'+category.strCategory}></a>
        </div>
    )
}

export default CategoryCard;