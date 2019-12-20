import React from "react";
import { Link } from "@reach/router";
import "../App.css";

const Breadcrumb = props => {
  const { order_name, family_name, genus_name, binomial, species } = props;
  return (
    <div className="content-container--breadcrumb">
      <div className="breadcrumb-inner">
        {order_name && (
          <>
            <Link to={`/${order_name}`} className="breadcrumb-link">
              {order_name}
            </Link>
          </>
        )}

        {family_name && (
          <>
            <p> > </p>
            <Link
              to={`/${order_name}/${family_name}`}
              className="breadcrumb-link"
            >
              {family_name}
            </Link>
          </>
        )}
        {genus_name && (
          <>
            <p> > </p>
            <Link
              to={`/${order_name}/${family_name}/${genus_name}`}
              className="breadcrumb-link"
            >
              {genus_name}
            </Link>
          </>
        )}
        {binomial && (
          <>
            <p> > </p>
            <Link
              to={`/${order_name}/${family_name}/${genus_name}/${binomial}`}
              className="breadcrumb-link"
            >
              {species}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
