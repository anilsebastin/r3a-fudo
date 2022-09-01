import { Modal, useMantineTheme } from "@mantine/core";
import css from '../styles/OrderModal.module.css';
import { useState } from 'react';
import { createOrder } from '../lib/orderHandler';
import toast, {Toaster} from "react-hot-toast";
import { useStore } from '../store/store';
import { useRouter } from "next/router";

export default function OrderModal({opened, setOpened, paymmentMethod}) {
    
    const router = useRouter();
    const theme = useMantineTheme();
    const total = typeof window !== 'undefined' && localStorage.getItem('total');

    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const resetCart = useStore((state) => state.resetCart)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = await createOrder({...formData, total, paymmentMethod})
            toast.success("Order placed successfully");
            resetCart();
            {
                typeof window !== "undefined" && localStorage.setItem('order', id)
            }
            router.push(`/order/${id}`)
        } catch (error) {
            toast.error("Error, Order was not placed");
        }
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose = {() => setOpened(null)}
        >
            <form onSubmit={handleSubmit} className={css.formContainer}>
                <input onChange={handleInputChange} type="text" name="name" required placeholder="Name" />
                <input onChange={handleInputChange} type="text" name="phone" required placeholder="Phone Number" />
                <textarea onChange={handleInputChange} cols={8} rows={3} name="address" placeholder="Address" />
                <span>You will have to pay <span>Rs {total}</span> on delivery</span>
                <button className="btn" type="submit">Place Order</button>
            </form>
            <Toaster />
        </Modal>
    )
}


//51:57