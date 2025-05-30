import { APIRequestContext, APIResponse } from '@playwright/test';
import { API_BASE_URL } from '../../core/const/endpoint';

export abstract class BaseAPI {
    protected apiContext: APIRequestContext;
    
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    protected async post(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
        const url = new URL(endpoint, API_BASE_URL).toString();
        return await this.apiContext.post(url, {
            ...options,
            data
        });
    }

    protected async get(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
        const url = new URL(endpoint, API_BASE_URL).toString();
        return await this.apiContext.get(url, {
            ...options,
            data
        });
    }

    protected async delete(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
        const url = new URL(endpoint, API_BASE_URL).toString();
        return await this.apiContext.delete(url, {
            ...options,
            data
        });
    }

    protected async patch(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
        const url = new URL(endpoint, API_BASE_URL).toString();
        return await this.apiContext.patch(url, {
            ...options,
            data
        });
    }
}