import { CategoriesAPI } from "../../../api/api-service/categories/categories.api";
import { test, expect } from "@playwright/test";
import categoryData from "../../api/category/category-data.json";
import { CreateCategoryDTO } from "../../../data-types/category/category-type";
test.describe("Category API Tests", () => {
  let categoriesAPI: CategoriesAPI;
  test.beforeEach(async ({ request }) => {
    categoriesAPI = new CategoriesAPI(request);
  });
  test("GET - Get all categories", async () => {
    const response = await categoriesAPI.getCategories();
    expect(response.status()).toBe(200);
  });
  test("GET - Get categories by valid ID", async () => {
    const response = await categoriesAPI.getCategoriesById(
      categoryData.get_valid_category.categoryId
    );
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.categoryId).toEqual(
      categoryData.get_valid_category.categoryId
    );
  });
  test("GET - Get category by ID does not exist", async () => {
    const response = await categoriesAPI.getCategoriesById(
      categoryData.get_invalid_category.categoryId
    );
    expect(response.status()).toBe(400);
  });
  test("POST - Create a new valid category", async () => {
    const response = await categoriesAPI.createCategory(
      categoryData.create_valid_category as CreateCategoryDTO
    );
    expect(response.status()).toBe(201);
  });
  test("POST - Create a new category when the category of the name already exists", async () => {
    const response = await categoriesAPI.createCategory(
      categoryData.create_invalid_category[0] as CreateCategoryDTO
    );
    expect(response.status()).toBe(409);
  });
  test("POST - Create a new category when the name of the category is empty", async () => {
    const response = await categoriesAPI.createCategory(
      categoryData.create_invalid_category[1] as CreateCategoryDTO
    );
    expect(response.status()).toBe(409);
  });
  test("DELETE - Delete a valid category", async () => {
    const response = await categoriesAPI.deleteCategories(
      categoryData.delete_valid_category.categoryId
    );
    expect(response.status()).toBe(204);
  });
  test("DELETE - Delete an invalid category", async () => {
    const response = await categoriesAPI.deleteCategories(
      categoryData.delete_invalid_category.categoryId
    );
    expect(response.status()).toBe(400);
  });
  test("PATCH - Update a category", async () => {
    const updateCategory = categoryData.update_valid_category;
    const { categoryId, categoryStatus, ...restData } = updateCategory;
    const response: any = await categoriesAPI.updateCategories(categoryId, restData);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.categoryId).toEqual(categoryId);
  });
  test("PATCH - Update a category with invalid data", async () => {
    const updateCategory = categoryData.update_invalid_category;
    const { categoryId, ...restData } = updateCategory;
    const response = await categoriesAPI.updateCategories(categoryId, restData);

    expect(response.status()).toBe(400);
  });
});
