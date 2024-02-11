export interface ApiProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: HeadersInit;
    body?: any;
}

export interface ApiReturn {
    message: string;
    success: any;
    data: any | null;
    error: string | null;
    isLoading: boolean;
}
