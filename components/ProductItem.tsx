import {memo, useState} from 'react'
import dynamic from 'next/dynamic'
import { AddProductToWishListProps } from './AddProductToWishList'
import loadash from 'lodash'

const AddProductToWishList = dynamic<AddProductToWishListProps>(()=> 
    import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
, {
    loading: ()=> <span>Carregando...</span>
})

interface ProductItemProps {
    product:{
        id:number,
        price:number,
        priceFormatted:string,
        title:string,
    },
    onAddToWishList: (id: number) => void
}

function ProductItemComponent({product, onAddToWishList}:ProductItemProps){
    const [isAddingToWishList, setIsAddingToWishList] = useState(false)
    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={()=> setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            {isAddingToWishList && (
                <AddProductToWishList 
                    onRequestClose={()=> setIsAddingToWishList(false)}
                    onAddToWishList={()=> onAddToWishList(product.id)}
                />
            )}
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps)=> {
    return loadash.isEqual(prevProps.product, nextProps.product) // Compara as propriedades de forma profunda
    // return Object.is(prevProps.product, nextProps.product) // Compara as propriedades de forma profunda
})