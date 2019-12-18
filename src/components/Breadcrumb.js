import React, { Component } from "react";
import { Link } from "@reach/router";
import "../App.css";

class Breadcrumb extends Component {
  state = {
    breadcrumbLinks: [],
  };
  render() {
    return <div></div>;
  }

  componentDidMount() {
    this.createBreadcrumbLinks();
  }

  createBreadcrumbLinks = () => {
    const { dataArray } = this.props;
    const speciesData = dataArray[0];
    const classificationKeys = [
      "MSW93_Order",
      "MSW93_Family",
      "MSW93_Genus",
      "MSW93_Binomial",
    ];
    let breadcrumbLinks = [];
    for (let key in speciesData) {
      for (let i = 0; i <= classificationKeys.length; i++) {
        if (key === classificationKeys[i]) {
          if (key === "MSW93_Order") {
            breadcrumbLinks.push({
              label: speciesData[key],
              link: `/${speciesData["MSW93_Order"]}`,
            });
          } else if (key === "MSW93_Family") {
            breadcrumbLinks.push({
              label: speciesData[key],
              link: `/${speciesData["MSW93_Order"]}/${
                speciesData["MSW93_Family"]
              }`,
            });
          } else if (key === "MSW93_Genus") {
            breadcrumbLinks.push({
              label: speciesData[key],
              link: `/${speciesData["MSW93_Order"]}/${
                speciesData["MSW93_Family"]
              }/${speciesData["MSW93_Genus"]}`,
            });
          } else if (key === "MSW93_Binomial") {
            breadcrumbLinks.push({
              label: speciesData[key],
              link: `/${speciesData["MSW93_Order"]}/${
                speciesData["MSW93_Family"]
              }/${speciesData["MSW93_Genus"]}/${this.props.binomial}]}`,
            });
          }
        }
      }
    }
    this.setState({
      breadcrumbLinks: breadcrumbLinks,
    });
  };

  createBreadcrumb = () => {
    const { breadcrumbLinks } = this.state;
    for (let i = 0; i <= breadcrumbLinks.length; i++) {
      return (
        <Link to={breadcrumbLinks[i]["link"]}>
          {breadcrumbLinks[i]["label"]}
        </Link>
      );
    }
  };
}

export default Breadcrumb;
