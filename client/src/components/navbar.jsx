import React from "react";

const NavBar = () => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none">
                        iFilm
                    </a>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/dramas" className="nav-link px-2 text-white">Dramas</a></li>
                        <li><a href="/movies" className="nav-link px-2 text-white">Movies</a></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        <a href="/signup">
                            <img src="/user.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
 
export default NavBar;