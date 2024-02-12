import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import ApiCustomer from '../../api/customer/customer.api';

type MenuParams = {
    id: string;
};

interface MenuDetails {
    id: number;
    name: string;
    description: string;
    price: number;
}

function MenuPage() {
    const { id } = useParams<MenuParams>();
    const [menuDetails, setMenuDetails] = useState<MenuDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchMenuDetails = async () => {
            setLoading(true);
            try {
                const response = await ApiCustomer.getMenuById(id);
                if (response.success) {
                    // Assurez-vous de vérifier la réponse correctement
                    setMenuDetails(response.data);
                } else {
                    setError('Failed to fetch menu details');
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchMenuDetails(); // Vérifiez l'existence de l'id avant de faire l'appel API
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {menuDetails ? (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {menuDetails.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Description: {menuDetails.description}
                        </Typography>
                        <Typography variant="body2">
                            Price: {menuDetails.price.toString()}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <p>No menu details found</p>
            )}
        </div>
    );
}

export default MenuPage;
