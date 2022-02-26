type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (from: number) => void;
};

function Pagination({ currentPage, totalPages, setCurrentPage }: Props) {
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (totalPages === 0) {
    return <></>;
  }

  return (
    <div className="pagination py-8">
      <>
        <div className="pagination__numbers relative">
          <p>
            Page: {currentPage} / {totalPages}
          </p>
          {currentPage !== 1 && (
            <button
              className="absolute -translate-y-2/4 top-1/2 w-32 bg-blue-500 -left-40   mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onPrevPage}
            >
              Previous
            </button>
          )}
          {currentPage !== totalPages && (
            <button
              className="absolute -translate-y-2/4 top-1/2 w-32 bg-blue-500 -right-40 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onNextPage}
            >
              Next
            </button>
          )}
        </div>
      </>
    </div>
  );
}

export default Pagination;
