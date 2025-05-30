import { APIRequestContext, APIResponse } from "@playwright/test";
import { ENDPOINT } from "../../../core/const/endpoint.ts";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../../../data-types/category/category-type.ts";
import { BaseAPI } from "../base-api.ts";

export class CategoriesAPI extends BaseAPI {
  constructor(apiContext: APIRequestContext) {
    super(apiContext);
  }

  async getCategories() {
    return await this.get(ENDPOINT.CATEGORY_GET);
  }

  async getCategoriesById(categoryId: string): Promise<APIResponse> {
    return await this.get(`${ENDPOINT.CATEGORY_GET}/${categoryId}`);
  }

  async createCategory(category: CreateCategoryDTO): Promise<APIResponse> {
    return await this.post(ENDPOINT.CATEGORY_GET, category);
  }

  async deleteCategories(categoryId: string): Promise<APIResponse> {
    return await this.delete(`${ENDPOINT.CATEGORY_GET}/${categoryId}`);
  }

  async updateCategories(categoryId: string, category: UpdateCategoryDTO): Promise<APIResponse> {
    return await this.patch(`${ENDPOINT.CATEGORY_UPDATE}/${categoryId}`, category);
  }
}

