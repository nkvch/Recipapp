import React, { useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link , Redirect } from "react-router-dom";
import American from '../images/flags/american.svg';
import British from '../images/flags/british.svg';
import Canadian from '../images/flags/canadian.svg';
import Chinese from '../images/flags/chinese.svg';
import Dutch from '../images/flags/dutch.svg';
import Egyptian from '../images/flags/egyptian.svg';
import French from '../images/flags/french.svg';
import Greek from '../images/flags/greek.svg';
import Indian from '../images/flags/indian.svg';
import Irish from '../images/flags/irish.svg';
import Italian from '../images/flags/italian.svg';
import Jamaican from '../images/flags/jamaican.svg';
import Japanese from '../images/flags/japanese.svg';
import Kenyan from '../images/flags/kenyan.svg';
import Malaysian from '../images/flags/malaysian.svg';
import Mexican from '../images/flags/mexican.svg';
import Moroccan from '../images/flags/moroccan.svg';
import Polish from '../images/flags/polish.svg';
import Portuguese from '../images/flags/portuguese.svg';
import Russian from '../images/flags/russian.svg';
import Spanish from '../images/flags/spanish.svg';
import Thai from '../images/flags/thai.svg';
import Tunisian from '../images/flags/tunisian.svg';
import Turkish from '../images/flags/turkish.svg';
import Vietnamese from '../images/flags/vietnamese.svg';
import Unknown from '../images/flags/unknown.jpg';


function CountryCard(props) {

    const [clicked, setClicked] = useState(false);
    const country = props.country;
    
    const pickImage =  {
        'American': American,
        'British': British,
        'Canadian': Canadian,
        'Chinese': Chinese,
        'Dutch': Dutch,
        'Egyptian': Egyptian,
        'French': French,
        'Greek': Greek,
        'Indian': Indian,
        'Irish': Irish,
        'Italian': Italian,
        'Jamaican': Jamaican,
        'Japanese': Japanese,
        'Kenyan': Kenyan,
        'Malaysian': Malaysian,
        'Mexican': Mexican,
        'Moroccan': Moroccan,
        'Polish': Polish,
        'Portuguese': Portuguese,
        'Russian': Russian,
        'Spanish': Spanish,
        'Thai': Thai,
        'Tunisian': Tunisian,
        'Turkish': Turkish,
        'Vietnamese': Vietnamese,
        'Unknown': Unknown,
    }

    return (
        <div className="card my-category-card my-country-card" style={{ height: 'fit-content' }}>
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
        <img src={pickImage[country.strArea]} className="card-img-top mt-3" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{country.strArea}</h5>
        </div>
        <a className="stretched-link" onClick={() => setClicked(true)} href={'/countries/'+country.strArea}></a>
        </div>
    )
}

export default CountryCard;