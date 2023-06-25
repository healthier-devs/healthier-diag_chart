import { paginationNum as pageNum } from "@/assets/constants";

interface IPaginationProps {
  index: number;
  endPage: number;
}

const Pagination = ({ index, endPage }: IPaginationProps) => {
  const renderPaginationCells = () => {
    const items = [];
    for (let i = endPage - pageNum + 1; i <= endPage; i++) {
      const isActive = i === index;

      const itemClassName = `flex w-6 h-6 items-center rounded justify-center text-[12px] leading-tight bg-white ${
        isActive
          ? "border border-app_stroke_healthier_blue text-font_healthier_blue"
          : "hover:bg-gray-100 hover:text-gray-700 border-transparent"
      }`;

      items.push(
        <li key={i}>
          <a
            href="#"
            className={itemClassName}
          >
            {i}
          </a>
        </li>
      );
    }

    return items;
  };
  return (
    <nav
      aria-label="Page navigation"
      className="w-full flex justify-center"
    >
      <ul className="inline-flex items-center -space-x-px gap-2">
        <li>
          <a
            href="#"
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg hover:bg-gray-100 hover:text-gray-700  "
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {renderPaginationCells()}
        <li>
          <a
            href="#"
            className="block px-3 py-2 leading-tight text-gray-500 bg-white rounded-r-lg hover:bg-gray-100 hover:text-gray-700  "
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
