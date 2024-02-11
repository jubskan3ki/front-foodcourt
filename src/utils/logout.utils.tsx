import Cookies from 'js-cookie';

export function useLogout() {
    const logout = () => {
        Cookies.remove('authToken');
        window.location.reload();
    };

    return logout;
}
