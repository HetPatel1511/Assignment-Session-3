import { useMutation, useQuery } from '@tanstack/react-query'
import { addProduct } from '../api/products'

const useProductAddMutation = () => {
    return useMutation({
    mutationFn: addProduct,
  })
}

export default useProductAddMutation
