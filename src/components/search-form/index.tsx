// import React from "react";
// import {SearchInput} from "ui/text-field"
// import {Button} from "ui/buttons"
// import css from "./searchForm.css"
// import textFieldCss from "ui/text-field/index.css"


// type searchForm = {
//     onSearch: ()=>{}
// }

// export function SearchForm(props) {
//     const clase = "." + textFieldCss["search-form_input"]    

//     const handleSubmit = (e:any)=>{
//         e.preventDefault()
//         const query = e.target.querySelector(clase).value 
        
//         props.onSearch(query)            
//     }


//     return <form onSubmit={handleSubmit} className={css["search-form_container"]}>
//             <SearchInput type="text"></SearchInput>
//             {/* <Button>Buscar</Button> */}
//     </form>
// }