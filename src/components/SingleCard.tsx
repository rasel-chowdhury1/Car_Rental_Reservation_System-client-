import React from "react";

const SingleCard = (props) => {
  const { title, totalNumber, icon } = props.item;
  return (
    <div className="bg-gradient-orange-red p-5 flex items-center justify-between rounded-md cursor-pointer">
      <div className="card__content">
        <h4 className="text-white text-base font-normal">{title}</h4>
        <span className="text-white text-2xl">{totalNumber}+</span>
      </div>

      <span className="text-2xl font-normal text-white/90">
        <i class={icon}></i>
      </span>
    </div>
  );
};

export default SingleCard;