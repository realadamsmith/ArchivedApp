import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ history }) => {
  const [input, setInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    console.log("you hit search >> ", input);
    if (input) {
      history.push(`/SearchResults/${input}`);
    } else {
      history.push(`/SearchResults`);
    }
    // dispatchSearch({
    //     // DISPATCH THE ACTION TYPE FROM THE SEARCH ACTION REDUX
    //     type: actionTypes.SET_SEARCH_TERM,
    //     term: input, // PASSES THE INPUT TERM FROM THE INPUT IN THE SEARCH BAR DIV
    // });
  };

  return (
    <form className="Field">
      <input
        value={input}
        type="search"
        placeholder="Find the Best Value Products"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      {/* <div className="SearchButton"> */}
      <button
        class="SearchButton"
        onClick={Search}
        type="submit"
        aria-label="Perform Search"
        id="global-search-submit"
      >
        <span class="g_b">
          <SearchIcon
            className="srch"
            alt="null"
            aria-hidden="true"
            width="40"
            height="40"
            color="white"
            // src="//i5.walmartimages.com/dfw/63fd9f59-43e0/1ed7036a-feba-43ca-8885-1d937a9aa4f2/v1/search-nav-black.b92f68559cf70c3bcfb9eae1d8dcca59ca58af11.svg"
          ></SearchIcon>
        </span>
      </button>
      {/* </div> */}
    </form>
  );
};

export default Search;
