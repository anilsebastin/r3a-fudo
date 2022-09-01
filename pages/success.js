import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal";

export default function Success() {
    return (
        <Layout>
            <OrderModal opened={true} paymmentMethod={1} />
        </Layout>
    )
}