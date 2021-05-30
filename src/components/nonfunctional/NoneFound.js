import React from 'react';

function NoneFound(props) {
    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="position-relative px-5">
            <div className="alert alert-warning alert-dismissable fade show my-alert start-0 end-0" role="alert">
                <div className="my-alet-header d-flex justify-content-between">
                <h5 className="alert-heading">Search properly</h5>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <hr></hr>
                <p>To find your meal type in name, ingredient or tag. For example <strong><u>big</u></strong>, <strong><u>beef</u></strong>. Or just a letter e.g. <strong><u>a</u></strong>.</p>
            </div>
                <p className="h1 text-muted none-found-message ms-0 me-0 mt-5">No meals found :(
                </p>
            </div>
        </div>
        </>
    )
}

export default NoneFound;