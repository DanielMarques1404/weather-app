export const SearchInput = () => {
  return (
    <div className="flex items-center justify-between gap-2 bg-Neutral-700 border border-Neutral-600 rounded-lg w-full p-4 select-none">
      <img src="/assets/images/icon-search.svg" alt="Search Icon" />
      <input
        className="flex-1 text-Neutral-200 outline-none bg-transparent"
        type="text"
        placeholder="Search for a place..."
      />
    </div>
  );
};

export const SearchButton = () => {
  return (
    <button className="flex items-center justify-between gap-2 bg-Blue-500 hover:bg-Blue-700 border rounded-lg w-full p-4">
      <span className="flex text-xl text-Neutral-200 font-semibold items-center justify-center w-full">Search</span>
    </button>
  );
};
