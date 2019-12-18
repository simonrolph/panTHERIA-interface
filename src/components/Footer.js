import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <p className="pantheria-ref">
          Nathan P. Myhrvold, Elita Baldridge, Benjamin Chan, Dhileep Sivam,
          Daniel L. Freeman, and S. K. Morgan Ernest. 2015. An amniote
          life-history database to perform comparative analyses with birds,
          mammals, and reptiles. Ecology 96:3109.{" "}
          <a href="http://dx.doi.org/10.1890/15-0846.1">DOI</a>
        </p>
        <p>
          This application was created by{" "}
          <a href="http://simon-rolph.com/" target="_blank">
            Simon Rolph
          </a>{" "}
          <span role="img" aria-label="tram emoji">
            🚋
          </span>
          &{" "}
          <a href="https://natalieclamp.com/" target="_blank">
            Natalie Clamp
          </a>
          <span role="img" aria-label="dinosaur emoji">
            🦕
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
