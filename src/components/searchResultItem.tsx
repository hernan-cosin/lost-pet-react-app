import React from "react"
import {Link} from "react-router-dom"

type SearchResultItemProps = {
    thumbnail: string,
    title: string,
    price: number,
    id: string
}

export function SearchResultItem(props: SearchResultItemProps) {
    const {thumbnail} = props
    const {title} = props
    const {price} = props
    const {id} = props

    return <div className="item-content">
        <img src={thumbnail} alt="product-img"  className="item-img"/>
        <div className="item-info">
            <h2 className="item-title">
            {title}
            </h2>
            <h3 className="item-price">${price}</h3>
            <Link to={`/item/${id}`}>Ver más</Link>
        </div>
    </div>
}

// class SearchResultItem extends React.Component<any, any> {
//     constructor(props){
//         super(props)
//     }

//     render() {
// console.log(this.props);
// console.log(this.props.results);
        
//         return <a href={this.props.results.permalink} target="_blank" className="item-link">
//             <div className="item-content">
//                 <img src={this.props.results.thumbnail} alt="product-img"  className="item-img"/>
//                 <div className="item-info">
//                     <h2 className="item-title">
//                     {this.props.results.title}
//                     </h2>
//                     <h3 className="item-price">${this.props.results.price}</h3>
//                 </div>
//             </div>
//         </a>
//     }
//   }
 
//   export {SearchResultItem}