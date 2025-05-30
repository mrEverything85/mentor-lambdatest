import { LoginAPI } from "../../../api/api-service/login/login.api";
import { APIRequestContext, test as base, request } from "@playwright/test";


type ApiLoginFixture = {
  loginAPI: LoginAPI;
}

export const test = base.extend<ApiLoginFixture>({
  loginAPI: async ({request}, use) => {
   
  
      const loginAPI = new LoginAPI(request);
  
      await use(loginAPI);
      await request.dispose();
  },
});
