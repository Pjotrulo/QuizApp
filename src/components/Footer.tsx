import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__build">
                <h2 className="footer__build--title">Build with: </h2>
                <p className="footer__build--paragraph">React</p>
                <p className="footer__build--paragraph">Typescript</p>
                <p className="footer__build--paragraph">Material UI</p>
                <p className="footer__build--paragraph">Sass</p>
            </div>
            <div className="footer__created">
                <h2 className="footer__created--title">Created by: </h2>
                <p className="footer__created--paragraph">Piotr Godwin</p>
                <p className="footer__created--paragraph"><strong>Email</strong>: piotrgdwn@gmail.com</p>
            </div>
        </footer>
    )
}

export default Footer;