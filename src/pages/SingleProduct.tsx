import { Link, Outlet, useParams } from "react-router-dom"
import useSingleProductQuery from "../query/queryHook/useSingleProductQuery"
import LoadingPlaceholder from "../components/LoadingPlaceholder"
import ErrorCard from "../components/ErrorCard"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"

export default function SingleProduct() {
    const { productId } = useParams()
    const { data, isLoading, error } = useSingleProductQuery(productId)
    const dispatch = useDispatch()

    return (
        <>
            {isLoading ? <LoadingPlaceholder />
                : error ? <ErrorCard errorMessage={error.message} />
                    :
                    <div className="px-4">
                        <div className="pt-6 md:flex">
                            <div className=" mt-6">
                                <img
                                    src={data.thumbnail}
                                    alt={data.title}
                                    className="row-span-2 min-w-40 rounded-lg object-cover"
                                />
                            </div>

                            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                                <div className="lg:col-span-2 lg:pr-8">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.title}</h1>
                                </div>

                                <div className="mt-4 lg:row-span-3 lg:mt-0">
                                    <h2 className="sr-only">Product information</h2>
                                    <p className="text-xl tracking-tight text-gray-900">Price:<span className="text-3xl tracking-tight text-gray-900">{data.price}</span></p>

                                    <div className="mt-4">
                                        <Link to={"customize"} className="cursor-pointer rounded px-4 py-2 bg-blue-600 text-white">Customize</Link>
                                    </div>

                                    <div className="mt-4">
                                        <button onClick={() => {
                                            dispatch(addToCart({
                                                id: data.id,
                                                name: data.title,
                                                price: data.price,
                                                category: data.category,
                                                quantity: data.stock
                                            }))
                                        }} className="cursor-pointer rounded px-4 py-2 bg-blue-600 text-white">Add to cart</button>
                                    </div>
                                </div>

                                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pr-8 lg:pb-16">
                                    <div>
                                        <h3 className="sr-only">Description</h3>

                                        <div className="space-y-6">
                                            <p className="text-base text-gray-900">{data.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Outlet context={{
                            id: data.id,
                            name: data.title,
                            price: data.price,
                            category: data.category,
                            quantity: data.stock
                        }} />
                    </div>
            }
        </>
    )
}
