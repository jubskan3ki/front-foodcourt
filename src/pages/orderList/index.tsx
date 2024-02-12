import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import ApiSeller from '../../api/seller/seller.api';
import ApiCustomer from '../../api/customer/customer.api';
import { setOrder } from '../../redux/slice/order.slice';
import { RootState } from '../../redux/store';

interface Order {
    id: number;
    date: string;
    content: string;
    userId?: number;
    restaurantId?: number;
    commentaire?: string;
    state?: string;
}

function OrderList() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const orders = useSelector((state: RootState) => state.order.value);
    const user = useSelector((state: RootState) => state.user.value);

    const isSeller = user?.roles === 2;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            let response;
            if (isSeller) {
                response = await ApiSeller.getAllOrder(4);
            } else {
                response = await ApiCustomer.getAllOrder();
            }
            if (response.success && response.data) {
                dispatch(setOrder(response.data));
            } else {
                console.error('Failed to fetch orders', response.error);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [dispatch, isSeller]);

    const handleValidateOrder = async (orderId: number) => {
        if (isSeller) return;

        const response = await ApiSeller.updateOrder(orderId);
        if (response.success) {
            console.log('Order validated', orderId);
        } else {
            console.error('Failed to validate order', response.error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders.length > 0 ? (
                            orders.map((order: Order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.content}</TableCell>
                                    <TableCell>{order.state}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                handleValidateOrder(order.id)
                                            }
                                        >
                                            Validate
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No orders to display
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default OrderList;
