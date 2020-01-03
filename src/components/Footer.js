import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <p className="pantheria-ref">
Kate E. Jones, Jon Bielby, Marcel Cardillo, Susanne A. Fritz, Justin O'Dell, C. David L. Orme, Kamran Safi, Wes Sechrest, Elizabeth H. Boakes, Chris Carbone, Christina Connolly, Michael J. Cutts, Janine K. Foster, Richard Grenyer, Michael Habib, Christopher A. Plaster, Samantha A. Price, Elizabeth A. Rigby, Janna Rist, Amber Teacher, Olaf R. P. Bininda-Emonds, John L. Gittleman, Georgina M. Mace, and Andy Purvis. 2009. PanTHERIA: a species-level database of life history, ecology, and geography of extant and recently extinct mammals. Ecology 90:2648.
          <a href="http://esapubs.org/archive/ecol/E090/184/">DOI</a>
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
