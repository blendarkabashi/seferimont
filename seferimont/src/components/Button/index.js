const Button = ({ type, disabled, success, secondary, inline, onClick, label, children, loading, className }) => {
  let bgColor = "bg-gray-900";
  let hoverColor = "hover:bg-gray-800";
  if (secondary) {
    bgColor = "bg-red-600";
    hoverColor = "hover:bg-red-500";
  }
  if (success) {
    bgColor = "bg-green-600";
    hoverColor = "hover:bg-green-500";
  }
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={`${disabled && "opacity-50 pointer-events-none"} ${className} h-[36px] ${
        inline ? "inline-block" : "flex w-full"
      } justify-center rounded-md ${bgColor} ${hoverColor}  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : label ? (
        label
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
