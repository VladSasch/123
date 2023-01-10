import React, { useState } from 'react';
import styles from './Paginator.module.css';
//import userPhoto from "../../assets/images/img.png";

import classNames from 'classnames';
const Paginator = ({
  totalItemsCount,
  pageSize,
  portionSize = 30,
  currentPage,
  onPageChanged,
}) => {
  let pageCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pageCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionNumber)

        .map((p) => {
          return (
            <span
              className={classNames(
                {
                  [styles.pageNumber]: true,
                },
                { [styles.selectedPage]: currentPage === p }
              )}
              //key={p}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}

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
