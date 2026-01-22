import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEY } from '../key'
import { fetchProductCategories } from '../api/productCategories'

const useProductCategoriesQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCT_CATEGORIES],
        queryFn: fetchProductCategories
    })
}

export default useProductCategoriesQuery
