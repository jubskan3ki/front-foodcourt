import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthProvider, AuthContext } from './context/auth.context';
import AuthPage from './pages/auth';
import AdminDashboard from './pages/adminDashboard';
import SellerDashboard from './pages/sellerDashboard';
import Menu from './pages/menu';
import OrderList from './pages/orderList';
import SellerList from './pages/sellerList';
import Settings from './pages/setting';
import Error from './pages/err';
import ApiUser from './api/user/user.api';
import { setUser } from './redux/slice/user.slice';
import { RootState } from './redux/store';

function PublicRoutes() {
    return (
        <Routes>
            <Route path="*" element={<AuthPage />} />
        </Routes>
    );
}

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sellers" element={<SellerList />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

function SellerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SellerDashboard />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

function AppContent() {
    const { isLoggedIn } = useContext(AuthContext);

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.value);

    useEffect(() => {
        if (!user?.roles) {
            const fetchData = async () => {
                try {
                    const userResult = await ApiUser.getCurrentUsers();
                    if (userResult) {
                        console.log('userResult', userResult.data);
                        dispatch(setUser(userResult.data));
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données',
                        error
                    );
                }
            };

            fetchData();
        }
    }, [dispatch, user]);

    function renderRoutes() {
        if (!isLoggedIn) return <PublicRoutes />;
        console.log('user?.roles', user?.roles);
        switch (user?.roles) {
            case 1: // Assurez-vous que le numéro correspond au rôle attendu pour un utilisateur
                return <UserRoutes />;
            case 2: // Assurez-vous que le numéro correspond au rôle attendu pour un vendeur
                return <SellerRoutes />;
            case 3: // Assurez-vous que le numéro correspond au rôle attendu pour un administrateur
                return <AdminRoutes />;
            default:
                return <PublicRoutes />;
        }
    }

    return <>{renderRoutes()}</>;
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
