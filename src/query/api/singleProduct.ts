import axios from "../../axios"

export const fetchSingleProduct = async (productId: any) => {
    const res = await axios.get(`/products/${productId}`);
    return res.data
}