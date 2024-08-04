const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const pageNumberArray = Array.from({ length: totalPage }).fill("");
  return (
    <nav className="custome-pagination">
      <ul className="pagination justify-content-center">
        {currentPage != 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(1)}>
              <i className="fa-solid fa-angles-left" />
            </button>
          </li>
        )}

        {pageNumberArray &&
          pageNumberArray.map((pageNumber, index) => {
            return (
              <li
                key={index}
                className={`page-item border ${
                  currentPage == index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}

        {currentPage != totalPage && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(totalPage)}>
              <i className="fa-solid fa-angles-right" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
