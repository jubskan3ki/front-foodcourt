/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import {
    Button,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ApiAdmin from '../../api/admin/admin.api';
import { RootState } from '../../redux/store';
import { setSeller } from '../../redux/slice/seller.slice';
import { setDraft } from '../../redux/slice/draft.slice';
import { toggleInitial } from '../../redux/slice/initial.slice';
import { setUser } from '../../redux/slice/user.slice';
import ApiUser from '../../api/user/user.api';

interface Seller {
    id: number;
    name: string;
    email: string;
    picture: string;
    description: string;
    category_id: number;
    open: boolean;
    user_id: number;
}

function AdminDashboard() {
    const [isDraft, setIsDraft] = useState(false);

    const dispatch = useDispatch();

    const initialLoaded = useSelector(
        (state: RootState) => state.initial.value
    );

    const sellers = useSelector((state: RootState) =>
        isDraft
            ? (state.draft.value as Seller[])
            : (state.seller.value as Seller[])
    );

    useEffect(() => {
        if (!initialLoaded) {
            const fetchData = async () => {
                try {
                    const sellersResult = await ApiAdmin.getAllSeller();
                    if (sellersResult) {
                        dispatch(setSeller(sellersResult.data.data));
                    }

                    const draftsResult = await ApiAdmin.getDraftSeller();
                    if (draftsResult) {
                        dispatch(setDraft(draftsResult.data.data));
                    }

                    const userResult = await ApiUser.getCurrentUsers();
                    if (userResult.success) {
                        dispatch(setUser(userResult.data));
                    }
                    dispatch(toggleInitial());
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données',
                        error
                    );
                }
            };

            fetchData();
        }
    }, [dispatch]);

    const handleDelete = async (sellerId: number) => {
        const response = await ApiAdmin.deleteSeller(sellerId);
        if (response.success) {
            console.log('Vendeur supprimé');
        } else {
            console.error('Erreur lors de la suppression du vendeur');
        }
    };

    const handleApprove = async (sellerId: number) => {
        const response = await ApiAdmin.approveSeller(sellerId);
        if (response.success) {
            console.log('Vendeur approuvé');
        } else {
            console.error("Erreur lors de l'approbation du vendeur");
        }
    };

    const handleOpen = async (sellerId: number) => {
        const response = await ApiAdmin.openSeller(sellerId);
        if (response.success) {
            console.log('Vendeur approuvé');
        } else {
            console.error("Erreur lors de l'approbation du vendeur");
        }
    };

    return (
        <div>
            <Switch
                checked={isDraft}
                onChange={() => setIsDraft(!isDraft)}
                name="draftSwitch"
                inputProps={{
                    'aria-label': 'Contrôler les vendeurs en attente',
                }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellers && sellers.length > 0 ? (
                        sellers.map((seller: Seller) => (
                            <TableRow key={seller.id}>
                                <TableCell>{seller.name}</TableCell>
                                <TableCell>{seller.email}</TableCell>
                                <TableCell>
                                    {isDraft ? (
                                        seller.open ? (
                                            'Ouvert'
                                        ) : (
                                            'Fermé'
                                        )
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handleOpen(seller.id)
                                            }
                                        >
                                            {seller.open ? 'Fermer' : 'Ouvrir'}
                                        </Button>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {isDraft ? (
                                        <Button
                                            onClick={() =>
                                                handleApprove(seller.id)
                                            }
                                        >
                                            Approuver
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handleDelete(seller.id)
                                            }
                                        >
                                            Supprimer
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                Aucun vendeur à afficher
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminDashboard;
