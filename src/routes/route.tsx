import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import ErrorPage404 from "../pages/ErrorPage404";
import Products from "../pages/Products";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import ShopLayout from "../components/layouts/ShopLayout";
import SingleProduct from "../pages/SingleProduct";
import CustomizeProduct from "../pages/CustomizeProduct";
import Checkout from "../pages/Checkout";
import AddProduct from "../pages/AddProduct";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "shop",
                element: <ShopLayout />,
                children: [
                    {
                        path: "products",
                        element: <Products />,
                        children: [
                            {
                                path: "add",
                                element: <AddProduct />
                            }
                        ]
                    },
                    {
                        path: "products/:productId",
                        element: <SingleProduct />,
                        children: [
                            {
                                path: "customize",
                                element: <CustomizeProduct />
                            },
                        ]
                    },
                    {
                        path: "cart",
                        element: <Cart />
                    },
                ]
            },
            {
                path: "checkout",
                element: <Checkout />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "*",
                element: <ErrorPage404 />
            }
        ]
    }
])

