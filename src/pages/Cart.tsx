import CartListItem from '../components/CartListItem'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../redux/slices/themeSlice'
import { selectCart, totalCost, totalItemsInCart } from '../redux/slices/cartSlice'

const Cart = () => {
    const theme = useSelector(selectTheme)
    const cart = useSelector(selectCart)
    const totalItemsInCartNumber = useSelector(totalItemsInCart)
    const totalCostNumber = useSelector(totalCost)
    return (
        <>
            <div className='min-h-screen'>
                <h1 className={`${theme == "light" ? "text-black" : "text-gray-300"} text-4xl ml-6 font-bold ml-2`}>Products In Your Cart</h1>
                {cart.length <= 0
                    ? <h1 className='text-3xl mt-4 mx-6'>Your cart is empty</h1>
                    :
                    <>
                        <div className="grid lg:grid-cols-1 gap-4 mt-4 mx-8">
                            {
                                cart.map((product: any) => {
                                    return <CartListItem id={product.id} name={product.name} price={product.price} quantity={product.quantity} category={product.category} quantityInCart={product.quantityInCart} key={product.id} />
                                })
                            }
                        </div>
                        <div className="max-w-full rounded overflow-hidden shadow-lg mx-8 my-4 bg-gray-700">
                            <div className="grid sm:grid-cols-2 px-6 py-4 text-white">
                                <div>
                                    <p className='text-2xl font-bold'>Total Items</p>
                                    <p className='text-16'>{totalItemsInCartNumber}</p>
                                </div>
                                <div>
                                    <p className='text-2xl font-bold'>Total Cost</p>
                                    <p className='text-16'>{totalCostNumber}</p>
                                </div>
                            </div>
                                <div className='mb-8'>
                                    <Link to="/checkout" className='rounded bg-blue-600 px-4 mx-6 text-white py-2 cursor-pointer'>Checkout</Link>
                                </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Cart
