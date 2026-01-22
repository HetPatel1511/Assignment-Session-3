import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEY } from '../key'
import { fetchProducts } from '../api/products'

const useProductsQuery = (search: any, category: any) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, search, category],
        queryFn: () => fetchProducts(search, category)
    })
}

export default useProductsQuery
