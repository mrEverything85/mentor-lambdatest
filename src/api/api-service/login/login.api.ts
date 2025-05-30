import { APIRequestContext } from "@playwright/test";
import { ENDPOINT } from "../../../core/const/endpoint.ts";
import { BaseAPI } from "../base-api.ts";
import { Account } from "../../../data-types/login/login-type.ts";

export class LoginAPI extends BaseAPI {
  constructor(apiContext: APIRequestContext) {
    super(apiContext);
  }
  async loginAccount(account: Account): Promise<any> {
    return this.post(ENDPOINT.AUTH_LOGIN, account );
  }
}
