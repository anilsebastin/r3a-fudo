import { useStore } from '../store/store';
import Layout from "../components/Layout";
import css from '../styles/Cart.module.css';
import Image from "next/image";
import { urlFor } from "../lib/client";
import toast, {Toaster} from 'react-hot-toast';
import { useState } from 'react';
import OrderModal from '../components/OrderModal';
import {useRouter} from "next/router";

export default function Cart() {

    const router = useRouter();

    const [paymmentMethod, setPaymmentMethod] = useState(null);
    const [order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
    );

    const CartData = useStore((state) => state.cart)
    const removePizza = useStore((state) => state.removePizza)
    
    const handleRemove = (index) => {
        removePizza(index);
        toast.error('Item removed from cart');
    }

    const total = () => CartData.pizzas.reduce((a, b) => a + b.Quantity * b.price, 0)
    
    const handleOnDelivery = () => {
        setPaymmentMethod(0);
        typeof window !== 'undefined' && localStorage.setItem('total', total())
    }

    const handleCheckout = async () => {
        setPaymmentMethod(1);
        typeof window !== 'undefined' && localStorage.setItem('total', total())
        
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(CartData.pizzas)
        });

        if(response.status === 500) return;

        const data = await response.json();
        toast.loading("Redirecting....");
        router.push(data.url);
    }

    return (
        <Layout>
            <div className={css.container}>
                {/* DETAILS */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>
                        <tbody className={css.tbody}>
                            {
                                CartData.pizzas.length > 0 && CartData.pizzas.map((pizza, index) => {
                                    const src = urlFor(pizza.image).url()
                                    return (
                                        <tr key={index}>
                                            <td className={css.imageTd}>
                                                <Image
                                                    loader = {() => src}
                                                    src={src}
                                                    alt=""
                                                    objectFit='cover'
                                                    width={85}
                                                    height={85}
                                                />
                                            </td>
                                            <td>
                                                {pizza.name}
                                            </td>
                                            <td>
                                                {
                                                    pizza.Size === 0 ?
                                                    "Small" :
                                                    pizza.Size === 1 ?
                                                    "Medium" : "Large"
                                                }
                                            </td>
                                            <td>
                                                { pizza.price }
                                            </td>
                                            <td>{ pizza.Quantity }</td>
                                            <td>
                                                { pizza.price * pizza.Quantity }
                                            </td>
                                            <td
                                                style={{
                                                    color: "var(--themeRed)",
                                                    cursor: "pointer"
                                                }}
                                                onClick={()=>handleRemove(index)}
                                            >X</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* SUMMARY */}
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{CartData.pizzas.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>Rs {total()}</span>
                        </div>
                    </div>

                    {
                        !order && CartData.pizzas.length > 0 ? (
                            <div className={css.buttons}>
                                <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                                <button className="btn" onClick={handleCheckout}>Pay Now</button>
                            </div>
                        ) : null
                    }
                    
                </div>
            </div>
            <Toaster />

            {/* Modal */}
            <OrderModal
                opened = {paymmentMethod === 0}
                setOpened = {setPaymmentMethod}
                paymmentMethod = {paymmentMethod}
            />
        </Layout>
    )
}