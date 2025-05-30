import { APIRequestContext, APIResponse } from "@playwright/test";
import { ENDPOINT } from "../../../core/const/endpoint";
import { BaseAPI } from "../base-api";
import { 
    RegisterAccount
} from "../../../data-types/register/register-type";

export class RegisterAPI extends BaseAPI {
    constructor(apiContext: APIRequestContext) {
        super(apiContext);
    }

    async registerAccount(account: RegisterAccount): Promise<APIResponse> {
        const formData = new FormData();
        
        formData.append('Email', account.Email);
        formData.append('Password', account.Password);
        formData.append('Role', account.Role);

        const details = account.UserDetailsToAddDTO;
        Object.entries(details).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(`UserDetailsToAddDTO.${key}`, String(value));
            }
        });

        return await this.post(ENDPOINT.AUTH_REGISTER, undefined, {
            multipart: formData
        });
    } 

    async activateAccount(userId: string): Promise<APIResponse> {
        const endpoint = ENDPOINT.AUTH_ACTIVATE.replace('{id}', userId);
        return await this.get(endpoint);
    }
}