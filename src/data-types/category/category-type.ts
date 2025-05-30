export interface Category {
  categoryId?: string;
  name?: string;
  categoryStatus?: string;
  description?: string;
}
export interface CreateCategoryDTO {
  name: string;
  categoryStatus: "Active" | "Inactive";
  description?: string;
}

export interface UpdateCategoryDTO {
  categoryId?: string;
  name?: string;
  categoryStatus?: "Active" | "Inactive";
  description?: string;
}
