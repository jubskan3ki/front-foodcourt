// ApiAuth.ts
import Cookies from 'js-cookie';
import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiAdmin {
    static async getAllSeller(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8095/api/admin/restaurant/all',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getDraftSeller(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8095/api/admin/restaurant/draft',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async deleteSeller(sellerId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/admin/restaurant/${sellerId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async approveSeller(sellerId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/admin/restaurant/draft/${sellerId}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async openSeller(sellerId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/admin/restaurant/state/${sellerId}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }
}

export default ApiAdmin;
