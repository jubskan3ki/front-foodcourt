import { useState, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import ApiAuth from '../../api/auth/auth.api';
import Form from '../../components/common/form';
import Picture from '../../components/common/picture';
import WelcomeWebp from '../../assets/image/webp/undraw_welcome.webp';
import Welcome from '../../assets/image/svg/undraw_welcome.svg';
import LoginWebp from '../../assets/image/webp/undraw_login.webp';
import Login from '../../assets/image/svg/undraw_login.svg';
import { FormData } from '../../interface/pages/auth.interface';
import Alert from '../../components/feedback/alert';
import {
    loginFormQuestions,
    registrationFormQuestions,
} from '../../data/auth.data';
import { ExtendedAlertProps } from '../../interface/components/feedback/alert.interface';
import { ApiReturn } from '../../interface/utils/api.interface';
import './style.css';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({});
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<ExtendedAlertProps>({
        type: '',
        message: '',
        key: Date.now(),
    });

    const toggleAuthMode = useCallback(() => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
        setFormData({});
        setAlert({ type: '', message: '', key: Date.now() });
    }, []);

    const handleAuthError = useCallback((error: Error | string) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        setAlert({ type: 'error', message: errorMessage, key: Date.now() });
    }, []);

    const authenticate = useCallback(
        async (data: any, apiMethod: (userData: any) => Promise<ApiReturn>) => {
            setIsLoading(true);
            try {
                const response = await apiMethod(data);
                if (!response.success) {
                    throw new Error(
                        response.message ||
                            "Une erreur est survenue lors de l'authentification."
                    );
                }
            } catch (error) {
                handleAuthError(
                    error instanceof Error ? error : "Erreur d'authentification"
                );
            } finally {
                setIsLoading(false);
            }
        },
        [handleAuthError]
    );

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const authData = isLogin
                ? { email: formData.email, password: formData.password }
                : {
                      email: formData.email,
                      username: formData.username,
                      password: formData.password,
                  };

            if (!isLogin && formData.password !== formData.confirmPassword) {
                handleAuthError('Les mots de passe ne correspondent pas!');
                return;
            }

            await authenticate(
                authData,
                isLogin ? ApiAuth.login : ApiAuth.register
            );

            window.location.reload();
        },
        [isLogin, formData, authenticate, handleAuthError]
    );

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            )}
            {alert.message && (
                <Alert
                    key={alert.key.toString()}
                    type={alert.type}
                    message={alert.message}
                    duration={30000}
                />
            )}
            <div className="auth-container">
                <div className="auth-form">
                    <div className="flex justify-center">
                        <Picture
                            webpSrc={isLogin ? LoginWebp : WelcomeWebp}
                            fallbackSrc={isLogin ? Login : Welcome}
                            alt="Welcome"
                            className="w-40 h-40"
                        />
                    </div>
                    <Form
                        dataQuestion={
                            isLogin
                                ? loginFormQuestions
                                : registrationFormQuestions
                        }
                        handleSubmit={handleSubmit}
                        dataArr={formData}
                        setDataArr={setFormData}
                        label={isLogin ? 'Se connecter' : "S'inscrire"}
                    />
                    <small role="button" tabIndex={0} onClick={toggleAuthMode}>
                        {isLogin
                            ? "Pas encore de compte? S'inscrire"
                            : 'Déjà un compte? Se connecter'}
                    </small>
                </div>
            </div>
        </>
    );
}

export default Auth;
