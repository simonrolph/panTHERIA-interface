import React from "react";
import { Link } from "@reach/router";

const Breadcrumb = props => {
  const { order_name, family_name, genus_name, binomial, species } = props;
  return (
    <div className="content-container--breadcrumb">
      <div className="breadcrumb-inner">
        {
          <>
            <Link to={`/choose-order`} className="breadcrumb-link">
              Browse taxa
            </Link>
          </>
        }

        {order_name && (
          <>
            <p> > </p>
            <Link to={`/${order_name}`} className="breadcrumb-link">
              Order: {order_name}
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
              Family: {family_name}
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
              Genus: {genus_name}
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
              Species: {species}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
