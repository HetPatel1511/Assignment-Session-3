import React, { useEffect, useRef, useState } from 'react'
import TextInput from '../components/TextInput'
import { selectCart, totalCost, totalItemsInCart } from '../redux/slices/cartSlice'
import { useSelector } from 'react-redux'

const Checkout = () => {
    const cart = useSelector(selectCart)
    const totalItemsInCartNumber = useSelector(totalItemsInCart)
    const totalCostNumber = useSelector(totalCost)
    const [hasCoupon, setHasCoupon] = useState<boolean>(false);
    const [coupon, setCoupon] = useState<number>(0);
    const [timer, setTimer] = useState<number>(300);
    const [couponApplied, setCouponApplied] = useState<number>(0);
    const [couponError, setCouponError] = useState<string>("");
    const couponInputRef = useRef<any>(null);

    useEffect(() => {
        if (hasCoupon && couponInputRef.current) {
            couponInputRef.current.focus()
        }
    }, [hasCoupon, couponInputRef.current])

    const handleCouponChange = (e: any) => {
        const value = e.target.value;
        setCoupon(value)
    }

    const applyCoupon = (e: any) => {
        e.preventDefault();
        if (coupon < 0) {
            setCouponError("Invalid Coupon");
        } else if (coupon > totalCostNumber) {
            setCouponError("Coupon exceeding the cost of cart cannot be applied")
        } else {
            setCouponError("")
            setCouponApplied(coupon)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(t => {
                if (t-1 <= 0) {
                    clearInterval(interval)
                }
                return t - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {cart.length > 0 ?
                <div className='px-6 min-h-screen'>
                    Stock reserved for {Math.floor(timer / 60)}:{timer % 60}
                    {hasCoupon
                        ?
                        <div>
                            <TextInput name="coupon" labelText='Coupon' value={coupon} type='number' error={couponError} onChange={handleCouponChange} ref={couponInputRef} />
                            <button className='rounded bg-blue-600 px-4 text-white py-2 cursor-pointer' onClick={applyCoupon}>Apply Coupon</button>
                        </div>
                        : <button className='text-xl text-blue-500 cursor-pointer' onClick={() => setHasCoupon(true)}> Have a Coupon? </button>
                    }
                    <div className="max-w-full rounded overflow-hidden shadow-lg my-4 bg-gray-700">
                        <div className="grid sm:grid-cols-2 px-6 py-4 text-white">
                            <div>
                                <p className='text-2xl font-bold'>Total Items</p>
                                <p className='text-16'>{totalItemsInCartNumber}</p>
                            </div>

                            {couponApplied == 0 || couponApplied == null ?
                                <div>
                                    <p className='text-2xl font-bold'>Total Cost</p>
                                    <p className='text-16'>{totalCostNumber}</p>
                                </div> :
                                <div>
                                    <p className='text-2xl font-bold'>Effective Cost</p>
                                    <p className='text-16'>{(totalCostNumber - couponApplied).toFixed(2)}</p>
                                    <p className='text-8'>You saved {couponApplied} (was {totalCostNumber})!</p>
                                </div>
                            }
                        </div>
                    </div>
                    <button className='rounded bg-blue-600 px-4 text-white py-2 cursor-pointer'>Buy Products</button>
                </div>
                : <></>}
        </>
    )
}

export default Checkout
