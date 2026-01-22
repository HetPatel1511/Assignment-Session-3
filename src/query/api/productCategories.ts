import axios from "../../axios"

export const fetchProductCategories = async () => {
    const res = await axios.get("/products/category-list");
    return res.data
}