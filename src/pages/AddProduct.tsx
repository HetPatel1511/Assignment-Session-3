import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import ProductModal from '../components/ProductModal'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useProductAddMutation from '../query/queryHook/useProductAddMutation'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../query/key'

const AddProduct = () => {
    const client = useQueryClient();
    const addProduct = useProductAddMutation()

    const navigate = useNavigate()
    const [newProduct, setNewProduct] = useState<{
        name: string,
        price: number,
        category: string,
        quantity: number
    }>({
        name: "",
        price: 0,
        category: "",
        quantity: 0
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
            addProduct.mutate({
                name,
                price,
                category,
                quantity
            })
            client.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
            setNewProduct({ name: "", price: 0, category: "", quantity: 0 })
            setNewProductError({ name: "", price: "", category: "", quantity: "" })
            navigate(`/shop/products`)
        }
    }

    const closeModal = () => {
        navigate(`/shop/products`)
    }

    return (
        <div>
            <ProductModal
                heading='New Product'
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

export default AddProduct
