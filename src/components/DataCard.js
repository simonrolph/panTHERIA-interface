import React from 'react';

const DataCard = (props) => {
  const { data, title, showUnknown, toggle } = props;

  const dataItems = Object.keys(data).map(key => {
    return (
      <div className={"dataItem " + ((typeof(data[key]) === 'string') ? 'dataItem--text' : 'dataItem--number' )} key={key}>
        <h3 className="dataItem__title">{key}</h3>
        {data[key] === 'Unknown' || data[key] === undefined ? null : <p className="dataItem__data">{data[key]}</p>}
      </div>
    )
  })

  return ( 
    <article className="dataCard">
      <h2 onClick={title === 'Unrecorded Data' ? toggle : null}>
        <div className="dataCard__title__container">
          {title}
        </div>
      </h2>
      {title !== 'Unrecorded Data' && <div className="dataCard__dataItems">{dataItems}</div>}
      {showUnknown && <div className="dataCard__dataItems">{dataItems}</div>}
    </article>
   );
}
 
export default DataCard;