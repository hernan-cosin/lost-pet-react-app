import React, {Component, useEffect, useState} from 'react';
// import Carousel from 'react-elastic-carousel';


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 }
];

export function ImageSlider(props) {
  
  const [miItem, setMiItem] = useState({pictures:[], title:"", price:Number, id:""})
  
  useEffect(()=>{    
    setMiItem(props)    
  }, [miItem])

  return (
    <div className="image-slider">
      <hr className="seperator" />
      <div className="carousel-wrapper">
        {/* <Carousel isRTL={false} breakPoints={breakPoints}>
          {miItem.pictures?.map((item) => (
            <div key={item.id}>
              <img src={item.secure_url} alt="" />
            </div>
          ))}
        </Carousel> */}
      </div>
    </div>
  );
}