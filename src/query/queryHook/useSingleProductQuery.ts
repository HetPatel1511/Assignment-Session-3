import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../key'
import { fetchSingleProduct } from '../api/singleProduct'

const useSingleProductQuery = (productId: any) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, productId],
        queryFn: () => fetchSingleProduct(productId)
    })
}

export default useSingleProductQuery
