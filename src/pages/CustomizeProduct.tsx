import React, { useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import ProductModal from '../components/ProductModal'
import TextInput from '../components/TextInput'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'

const CustomizeProduct = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        id,
        name,
        price,
        category,
        quantity
    } = useOutletContext<{
        id: string;
        name: string;
        price: number;
        category: string;
        quantity: number;
    }>()

    const [newProduct, setNewProduct] = useState<{
        name: string,
        price: number,
        category: string,
        quantity: number
    }>({
        name: name,
        price: price,
        category: category,
        quantity: quantity
    });

    const [newProductError, setNewProductError] = useState<{
        name: string,
        price: string,
        category: string,
        quantity: string
    }>({
        name: "",
        price: "",
        category: "",
        quantity: ""
    });

    const handleValueChange = (e: any) => {
        const key = e.target.id
        const value = e.target.value
        setNewProduct((p) => { return { ...p, [key]: value } })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const name = newProduct.name.trim();
        const price = Number(newProduct.price);
        const category = newProduct.category.trim().toLowerCase();
        const quantity = Number(newProduct.quantity);
        let error = false;
        setNewProductError({
            name: "",
            price: "",
            category: "",
            quantity: ""
        })
        if (name == "") {
            setNewProductError((error) => { return { ...error, name: "Product name is required" } })
            error = true;
        }
        if (price <= 0) {
            setNewProductError((error) => { return { ...error, price: "Invalid product price" } })
            error = true;
        }
        if (category == "") {
            setNewProductError((error) => { return { ...error, category: "Product category is required" } })
            error = true;
        }
        if (quantity < 0) {
            setNewProductError((error) => { return { ...error, category: "Invalid product quantity" } })
            error = true;
        }
        if (!error) {
            dispatch(addToCart({
                id: (Math.random()*100000),
                name,
                price,
                category,
                quantity
            }))
            setNewProduct({ name: "", price: 0, category: "", quantity: 0 })
            setNewProductError({ name: "", price: "", category: "", quantity: "" })
            navigate(`/shop/cart`)
        }
    }

    const closeModal = () => {
        navigate(`/shop/products/${productId}`)
    }

    return (
        <div>
            <ProductModal
                key={id}
                heading='Customize Product'
                onCloseModal={closeModal}
                onSubmit={handleSubmit}
                showModal={true}
                submitButtonText='Submit'
                body={
                    <div>
                        <TextInput
                            name="name"
                            labelText="Name"
                            value={newProduct.name}
                            type="text"
                            error={newProductError.name}
                            onChange={handleValueChange}
                            ref={null}
                        />
                        <TextInput
                            name="price"
                            labelText="Price"
                            value={newProduct.price}
                            type="number"
                            error={newProductError.price}
                            onChange={handleValueChange}
                            ref={null}
                        />
                        <TextInput
                            name="category"
                            labelText="Category"
                            value={newProduct.category}
                            type="text"
                            error={newProductError.category}
                            onChange={handleValueChange}
                            ref={null}
                        />
                        <TextInput
                            name="quantity"
                            labelText="Quantity"
                            value={newProduct.quantity}
                            type="text"
                            error={newProductError.quantity}
                            onChange={handleValueChange}
                            ref={null}
                        />
                    </div>
                }
            />
        </div>
    )
}


export default CustomizeProduct;
