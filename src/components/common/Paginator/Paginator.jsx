import React, { useState } from "react";
import classes from "./Paginator.module.scss";
import cn from "classnames";

let Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 20,
}) => {
  // подсчет кол-ва страниц (всех юзеров / кол-во юзеров на странице)
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  // подсчет порций (кол-ва номеров страниц, выводимых за раз)
  let portionCount = Math.ceil(pagesCount / portionSize);
  // добавление в стейт номера порции
  // (чтоб при перезагрузке выводилась та порция, в которой номер текущей страницы)
  let [portionNumber, setPortionNumber] = useState(
    Math.ceil(currentPage / portionSize)
  );
  // крайний левый номер страницы в порции
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  // крайний правый номер страницы в порции
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={classes.Paginator}>
      {/* если номер порции больше 1, вывод кнопки prev */}
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {/* вывод массива страниц с фильтром на текущую порцию */}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              key={page}
              className={cn(
                {
                  [classes.selectedPage]: currentPage === page,
                },
                classes.pageNumber
              )}
              onClick={(e) => {
                onPageChanged(page);
              }}
            >
              {page}
            </span>
          );
        })}

      {/* если порций больше чем текущая порция, вывод кнопки next */}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
