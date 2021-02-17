import React, { useState } from "react";
import classes from "./Paginator.module.scss";
import cn from "classnames";
import WindowDimensions from "../../../utils/windowDimensions";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

let Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let windowWidth = WindowDimensions();

  if (windowWidth.width < 900 && portionSize == 10) {
    portionSize = 5;
  }

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  // portion is the quantity of page numbers displayed at a time
  let portionCount = Math.ceil(pagesCount / portionSize);
  // adding a portion number to state so that when the page is reloaded,
  // the portion with the current page number is displayed
  let [portionNumber, setPortionNumber] = useState<number>(
    Math.ceil(currentPage / portionSize)
  );

  // the leftmost page number in the portion
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  // the rightmost page number in the portion
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={classes.Paginator}>
      {/* if the portion number > 1 show the button prev */}
      {portionNumber > 1 && (
        <div
          className={cn(classes.Arrow, classes.Prev)}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        />
      )}

      <div className={classes.Pages}>
        {/* outputting an array of pages with the filter of the current portion */}
        {pages
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page) => {
            return (
              <div
                key={page}
                className={cn(
                  {
                    [classes.SelectedPage]: currentPage === page,
                  },
                  classes.PageNumber
                )}
                onClick={(e) => {
                  onPageChanged(page);
                }}
              >
                {page}
              </div>
            );
          })}
      </div>

      {/* if there are more portions than the current portion, show the button next */}
      {portionCount > portionNumber && (
        <div
          className={cn(classes.Arrow, classes.Next)}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        />
      )}
    </div>
  );
};

export default Paginator;
