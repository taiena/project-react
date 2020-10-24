import React from "react";
import classes from "./Paginator.module.scss";

let Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  // подсчет кол-ва страниц (всех юзеров / кол-во юзеров на странице)
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page, index) => {
        return (
          <span
            key={index}
            className={currentPage === page && classes.selectedPage}
            onClick={(e) => {
              onPageChanged(page);
            }}
          >
            {page}&nbsp;
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
