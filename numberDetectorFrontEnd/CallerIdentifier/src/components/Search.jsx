import React, { useState, useEffect,useId } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const id=useId()

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearch = async () => {
    setLoading(true);

    debugger;
    fetch(
      `http://localhost:63965/api/CallerIdentity/Search?keyword=${searchTerm}`
    )
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((resp) => {
        console.log(resp[0]);
        console.log(resp[1]);
        console.log(resp[2]);
        setSearchResults(resp);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));

    // Check if the response indicates spam
    //   if (data === 'Spam Number') {
    //     setSearchResults({ type: 'spam' });
    //   } else {
    //     setSearchResults({ type: 'contact', data: JSON.parse(data) });
    //   }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="absolute top-0 right-0 mt-2 mr-2"
          aria-label="Search"
          onClick={handleSearch}
          disabled={loading}
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5.2-5.2"
            ></path>
            <circle cx="10" cy="10" r="8"></circle>
          </svg>
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {searchResults && (
        <div>
          {searchResults.type === "spam" ? (
            <p>This number is marked as spam.</p>
          ) : (
            <div className="bg-gray-200 p-10 m-4 rounded">
              <p className="font-bold ">Contact Details:</p>
              <ul className="list-disc pl-6">
                {searchResults.map((item) => (
                  <li
                    key={id}
                    id={id}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
