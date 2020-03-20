import React from 'react';

const DataCard = (props) => {
  const { data, title } = props;

  const dataItems = Object.keys(data).map(key => {
    return (
      <div className="dataItem" key={key}>
        <h3>{key}</h3>
        {data[key] === 'Unknown' || data[key] === undefined ? null : <p>{data[key]}</p>}
      </div>
    )
  })

  return ( 
    <article className="dataCard">
      <h2>{title}</h2>
      {dataItems}
    </article>
   );
}
 
export default DataCard;