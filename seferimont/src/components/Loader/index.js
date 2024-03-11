const Loader = () => {
  return (
    <div className=" bg-white flex flex-col items-center justify-center w-full h-full absolute bottom-0 left-0 right-0 top-0">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>
  );
};

export default Loader;
