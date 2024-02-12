import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import ApiCustomer from '../../api/customer/customer.api';
import { RootState } from '../../redux/store';

type MenuParams = {
    id: string;
};

interface MenuDetails {
    id: number;
    name?: string;
    description: string;
    price: number;
}

interface OrderData {
    date: string;
    user_id: number | undefined;
    restaurant_id: number | undefined;
    content: number[] | undefined;
    commentaire: string;
    state: number;
}

function MenuPage() {
    const { id } = useParams<MenuParams>();
    const [menuDetails, setMenuDetails] = useState<MenuDetails | null>(null);
    const user = useSelector((state: RootState) => state.user.value);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchMenuDetails = async () => {
            setLoading(true);
            try {
                const response = await ApiCustomer.getMenuById(id);
                if (response && response.data) {
                    setMenuDetails(response.data.data);
                } else {
                    setError('Failed to fetch menu details');
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchMenuDetails();
    }, [id]);

    const handleCreateOrder = async () => {
        if (!user || !user.id || !id || !menuDetails || !menuDetails.id) {
            setError('Missing user or menu details');
            return;
        }

        const orderData: OrderData = {
            date: new Date().toISOString(),
            user_id: user.id,
            restaurant_id: parseInt(id, 10),
            content: [menuDetails.id],
            commentaire: 'Votre commentaire ici et là',
            state: 1,
        };

        try {
            const response = await ApiCustomer.createOrder(orderData);
            if (response) {
                console.log(response);
            } else {
                setError('Failed to create order');
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {menuDetails ? (
                <>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {menuDetails.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Description: {menuDetails.description}
                            </Typography>
                            <Typography variant="body2">
                                Price: ${menuDetails.price.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button
                        onClick={handleCreateOrder}
                        variant="contained"
                        color="primary"
                    >
                        Create Order
                    </Button>
                </>
            ) : (
                <p>No menu details found</p>
            )}
        </div>
    );
}

export default MenuPage;
