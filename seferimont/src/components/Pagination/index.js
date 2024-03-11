const Pagination = ({ page, setPage, total, onNext, onPrev, offset }) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Te shfaqura <span className="font-medium">{(page - 1) * offset + 1}</span> deri{" "}
          <span className="font-medium">{Math.min(page * offset, total)}</span> prej{" "}
          <span className="font-medium">{total}</span> rezultateve
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className={`${
            page <= 1 && "pointer-events-none opacity-50"
          } relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0`}
          onClick={() => setPage(page - 1)}
        >
          Faqja paraprake
        </a>
        <a
          href="#"
          className={`${
            Math.min(page * offset, total) == total && "pointer-events-none opacity-50"
          } relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0`}
          onClick={() => setPage(page + 1)}
        >
          Faqja tjeter
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
