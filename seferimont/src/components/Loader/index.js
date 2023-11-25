const Loader = () => {
  return (
    <div className=" bg-white flex flex-col items-center justify-center w-full h-full absolute bottom-0 left-0 right-0 top-0">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  );
};

export default Loader;
