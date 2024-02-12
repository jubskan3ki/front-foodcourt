import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import ApiCustomer from '../../api/customer/customer.api';
import { setSeller } from '../../redux/slice/seller.slice';
import { RootState } from '../../redux/store';

function SellerList() {
    const dispatch = useDispatch();
    const sellers = useSelector((state: RootState) => state.seller.value);

    useEffect(() => {
        const fetchSellers = async () => {
            const response = await ApiCustomer.getAllSeller();
            if (response && response.data) {
                dispatch(setSeller(response.data.data));
            } else {
                console.error('Failed to fetch sellers', response.error);
            }
        };

        fetchSellers();
    }, [dispatch]);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Menu</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellers && sellers.length > 0 ? (
                        sellers.map((seller, index) => (
                            <TableRow key={index}>
                                <TableCell>{seller.id}</TableCell>
                                <TableCell>{seller.name}</TableCell>
                                <TableCell>{seller.email}</TableCell>
                                <TableCell>{seller.description}</TableCell>
                                <TableCell>
                                    <Link
                                        to={`/menu/${seller.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        View Menu
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No sellers to display
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default SellerList;
