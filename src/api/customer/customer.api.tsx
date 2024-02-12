import Cookies from 'js-cookie';
import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiCustomer {
    static async getAllSeller(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8095/api/customer/restaurant/all',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getMenuById(menuId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/customer/carte/${menuId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getAllOrder(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8095/api/customer/commande/all',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async createOrder(orderData: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/customer/commande/create`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: orderData,
        };

        return api(apiProps);
    }
}

export default ApiCustomer;
