import Cookies from 'js-cookie';
import { ApiProps, ApiReturn } from '../interface/utils/api.interface';

export async function api({
    url,
    method,
    headers,
    body,
}: ApiProps): Promise<ApiReturn> {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            if (response.status === 401) {
                Cookies.remove('authToken');
                window.location.reload();
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data,
            error: null,
            isLoading: false,
            success: false,
            message: '',
        };
    } catch (err) {
        console.error('Error:', err);
        return {
            data: null,
            error: (err as Error).message,
            isLoading: false,
            success: false,
            message: '',
        };
    }
}
