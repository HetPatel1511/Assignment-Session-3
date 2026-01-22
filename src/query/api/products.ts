import axios from "../../axios"

export const fetchProducts = async (search: any, category: any) => {
    const API = search ?
        `/products/search?q=${search}` :
        (
            category && category.toLowerCase() != "all" ?
                `/products/category/${category}` :
                "/products"
        )
    const res = await axios.get(API);
    return res.data
}

export const addProduct = async (product: any) => {
    const res = await axios.post("/products", {data: product});
    return res.data
}