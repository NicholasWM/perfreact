import {List, ListRowRenderer} from 'react-virtualized' 
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
    totalPrice: number,
    results: Array<{
        id:number,
        price:number,
        priceFormatted:string,
        title:string,
    }>,
    onAddToWishList: (id: number) => void
}

export function SearchResults({totalPrice, results, onAddToWishList}: SearchResultsProps){
    const rowRenderer:ListRowRenderer = ({index, key, style})=>(
        <div key={key} style={style}>
            <ProductItem 
                key={key}
                product={results[index]}
                onAddToWishList={onAddToWishList}
            />
        </div>
    )
    
    return (
        <div>
            <h2>Total: {totalPrice}</h2>
            <List 
                height={300}
                rowHeight={25}
                width={900}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />

            {/* {results.map(product => (
                <ProductItem key={product.id} onAddToWishList={onAddToWishList} product={product}/>
            ))} */}
        </div>
    )
}