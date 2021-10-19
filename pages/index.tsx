import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults'


type Results = {
  totalPrice:number;
  data: any[]
}


const Home: NextPage = () => {

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data:[]
  })

  const addToWishList= useCallback(
    async (id: number) => {
      console.log(id)
    },[]
  )

  async function handleSearch(event: FormEvent){
    event.preventDefault()

    if(!search.trim()){
      return ;
    }
    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()
    const formatter = new Intl.NumberFormat('pt-BR', {
      style:'currency',
      currency: 'BRL'
    })
    const products = data.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormatted: formatter.format(product.price),
    }))
    const totalPrice = data.reduce((total:number, product) => total+ product.price, 0)

    setResults({totalPrice, data: products})
  }
  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input onChange={e=> setSearch(e.target.value)} type="text" value={search} />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults totalPrice={results.totalPrice} onAddToWishList={addToWishList} results={results.data}/>
    </div>
  )
}

export default Home
