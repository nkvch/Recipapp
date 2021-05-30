import React from 'react';

function Footer(props) {
    return (
        <div className="container-fluid bg-dark text-light footer mt-5">
            <div className="container my-4">
                <div className="row">
                    <div className="col-md d-flex flex-column align-items-center">
                        <div className="footer-column-heading container-fluid  mb-3">
                            <h6 className="footer-heading mx-auto">Contact</h6>
                        </div>
                        <ul className="list-unstyled">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                <a href='https://github.com/nkvch' className="ms-3 text-unstyled footer-link">github.com/nkvch</a>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                </svg>
                                <a href='mailto:nkvch.st@gmail.com' className="ms-3 footer-link">nkvch.st@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md d-flex flex-column align-items-center">
                        <div className="footer-column-heading container-fluid mb-3">
                            <h6 className="footer-heading mx-auto">API</h6>
                        </div>
                        <p className="about-api">This website is using <strong><a href='https://www.themealdb.com/' className="footer-link">TheMealDB</a></strong> API with developer test key '1' as API key.</p>
                    </div>
                    <div className="col-md d-flex flex-column align-items-center justify-content-center">
                        <a className="navbar-brand mx-0 footer-logo footer-link" href="/">Recipapp</a>
                        <p className="mb-0">2021</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;