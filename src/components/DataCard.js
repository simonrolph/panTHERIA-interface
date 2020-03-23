import React from 'react';

const DataCard = (props) => {
  const { data, title } = props;

  const dataItems = Object.keys(data).map(key => {
    return (
      <div className={"dataItem " + ((typeof(data[key]) === 'string') ? 'dataItem--text' : 'dataItem--number' )} key={key}>
        <h3>{key}</h3>
        {data[key] === 'Unknown' || data[key] === undefined ? null : <p>{data[key]}</p>}
      </div>
    )
  })

  return ( 
    <article className="dataCard">
      <h2 className="dataCard__title">
        <div className="dataCard__title__container">
          {title}
        </div>
      </h2>
      <div className="dataCard__dataItems">{dataItems}</div>
    </article>
   );
}
 
export default DataCard;