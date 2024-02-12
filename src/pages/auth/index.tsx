import React, { useState, useCallback } from 'react';
import { CircularProgress, Button } from '@mui/material';
import ApiAuth from '../../api/auth/auth.api';
import Form from '../../components/common/form';
import Picture from '../../components/common/picture';
import WelcomeWebp from '../../assets/image/webp/undraw_welcome.webp';
import Welcome from '../../assets/image/svg/undraw_welcome.svg';
import LoginWebp from '../../assets/image/webp/undraw_login.webp';
import Login from '../../assets/image/svg/undraw_login.svg';
import Alert from '../../components/feedback/alert';
import {
    loginFormQuestions,
    registrationFormQuestions,
    createSellerFormQuestions,
} from '../../data/auth.data';
import './style.css';

interface FormData {
    email?: string;
    password?: string;
    username?: string;
    restaurant_name?: string;
    description?: string;
    category_id?: number;
}

function Auth() {
    const [authMode, setAuthMode] = useState('login'); // login, register, createSeller
    const [formData, setFormData] = useState<FormData>({});
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    // Toggle between auth modes
    const toggleAuthMode = useCallback((mode: React.SetStateAction<string>) => {
        setAuthMode(mode);
        setFormData({});
        setAlert({ type: '', message: '', key: Date.now() });
    }, []);

    // Handle authentication errors
    const handleAuthError = useCallback((error: { message: any }) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        setAlert({ type: 'error', message: errorMessage, key: Date.now() });
    }, []);

    // Perform the authentication action
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);

        let form: FormData = {};

        try {
            let response;
            switch (authMode) {
                case 'login':
                    form = {
                        email: formData.email,
                        password: formData.password,
                    };
                    console.log(form);
                    response = await ApiAuth.login(form);
                    break;
                case 'register':
                    form = {
                        email: formData.email,
                        username: formData.username,
                        password: formData.password,
                    };
                    response = await ApiAuth.register(form);
                    break;
                case 'createSeller':
                    form = {
                        email: formData.email,
                        username: formData.username,
                        password: formData.password,
                        restaurant_name: formData.restaurant_name,
                        description: formData.description,
                        category_id: 1,
                    };
                    console.log(form);
                    response = await ApiAuth.createSeller(form);
                    break;
                default:
                    throw new Error('Invalid auth mode');
            }

            if (!response) {
                handleAuthError(
                    Error instanceof Error
                        ? Error
                        : new Error('Unknown authentication error')
                );
            }
            window.location.reload();
            console.log('Auth Success:', response);
        } catch (error) {
            console.error('Auth Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const selectFormQuestions = () => {
        switch (authMode) {
            case 'login':
                return loginFormQuestions;
            case 'register':
                return registrationFormQuestions;
            case 'createSeller':
                return createSellerFormQuestions;
            default:
                return [];
        }
    };

    const currentFormQuestions = selectFormQuestions();

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            )}
            {alert.message && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    duration={30000}
                />
            )}
            <div className="auth-container">
                <div className="auth-form">
                    <div className="flex justify-center">
                        <Picture
                            webpSrc={
                                authMode === 'login' ? LoginWebp : WelcomeWebp
                            }
                            fallbackSrc={authMode === 'login' ? Login : Welcome}
                            alt="Auth Illustration"
                            className="w-40 h-40"
                        />
                    </div>
                    <Form
                        dataQuestion={currentFormQuestions}
                        handleSubmit={handleSubmit}
                        dataArr={formData}
                        setDataArr={setFormData}
                        label={
                            authMode.charAt(0).toUpperCase() + authMode.slice(1)
                        }
                    />
                    <div className="auth-mode-toggle">
                        <Button
                            variant="text"
                            onClick={() => toggleAuthMode('login')}
                        >
                            Login
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => toggleAuthMode('register')}
                        >
                            Register
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => toggleAuthMode('createSeller')}
                        >
                            Create Seller
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;
