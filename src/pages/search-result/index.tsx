// import React from "react";
// import { SearchResultItem } from "components/searchResultItem";
// import { useSearchResults } from "hooks/hooks";
// import css from "./search-result.css"

// export function SearchResult() {    
//     const results = useSearchResults()
    
//     return <div className={css["search-result_container"]}>
//        <h2>search result</h2>
//         <div className={css["result-container"]}>
//             {results.map((i)=><SearchResultItem key={i.id} id={i.id} title={i.title} price={i.price} thumbnail={i.thumbnail}></SearchResultItem>)}
//         </div>
//     </div>
// }