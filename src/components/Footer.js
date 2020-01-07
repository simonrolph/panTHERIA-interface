import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <p className="pantheria-ref">
          <a href="http://esapubs.org/archive/ecol/E090/184/">
            Kate E. Jones, Jon Bielby, Marcel Cardillo, <i>et al.</i> 2009.
            PanTHERIA: a species-level database of life history, ecology, and
            geography of extant and recently extinct mammals. Ecology 90:2648.
          </a>
        </p>
        <p>
          This application was created by{" "}
          <a
            href="http://simon-rolph.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Simon Rolph
          </a>{" "}
          <span role="img" aria-label="tram emoji">
            🚋
          </span>
          &{" "}
          <a
            href="https://natalieclamp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Natalie Clamp
          </a>{" "}
          <span role="img" aria-label="dinosaur emoji">
            🦕
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
