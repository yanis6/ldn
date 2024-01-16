import { useState } from 'react';

const SearchComponent = ({ onSearch, Icon, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="flex flex-1 gap-x-4 border-2 p-4 mb-4 rounded-md relative">
      {Icon && (
        <Icon
          className="absolute inset-y-0 left-2 h-full w-5 text-gray-500"
          aria-hidden="true"
        />
      )}
      <input
        id="search-field"
        className="h-full w-full bg-transparent pl-8 pr-0 text-black"
        placeholder={placeholder}
        type="search"
        name="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;
