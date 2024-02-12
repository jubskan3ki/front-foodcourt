import Cookies from 'js-cookie';
import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiSeller {
    static async createMenu(menuData: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8095/api/seller/carte/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: menuData,
        };

        return api(apiProps);
    }

    static async createProduct(productData: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8095/api/seller/product/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: productData,
        };

        return api(apiProps);
    }

    static async deleteMenuById(menuId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/seller/carte/${menuId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async deleteProductById(productId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/seller/product/${productId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getAllOrder(sellertId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/seller/commande/restaurant/${sellertId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async updateOrder(orderId: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8095/api/seller/commande/update/${orderId}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }
}

export default ApiSeller;
