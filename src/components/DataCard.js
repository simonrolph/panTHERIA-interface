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
    dataItems.length > 0 && <article className={title === 'Unrecorded Data' ? "dataCard dataCard--unrecorded" : "dataCard"}>
      <div className={title === 'Unrecorded Data' ? "dataCard__title__container dataCard__title__container--unrecorded" : "dataCard__title__container"} onClick={title === 'Unrecorded Data' ? toggle : null}>
        <h2>
            {title === 'Unrecorded Data' && !showUnknown && <div className="arrow arrow-right"></div>}
            {title === 'Unrecorded Data' && showUnknown && <div className="arrow"></div>}
            {title}
        </h2>
      </div>
      {title !== 'Unrecorded Data' && <div className="dataCard__dataItems">{dataItems}</div>}
      {showUnknown && <div className="dataCard__dataItems">{dataItems}</div>}
    </article>
   );
}
 
export default DataCard;