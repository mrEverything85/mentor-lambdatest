import {Page} from "@playwright/test";
import { BasePage } from "../base-page";

export class CategoriesPage extends BasePage{
     private lnkApplicationLoc = this.page.getByRole('link', { name: 'Manage Categories' });
     private btnAddCategoryLoc = this.page.getByRole('button', { name: 'Add Category' });
     private txtCateNameLoc = this.page.getByPlaceholder('Enter name here');
     private txtDescriptionLoc = this.page.getByRole('textbox', { name: 'Description' });
     private chkActiveLoc = this.page.getByRole('checkbox', { name: 'Active' });
     private btnAddLoc = this.page.getByRole('button', { name: 'Add', exact: true });
     constructor(page:Page){
        super(page);
     }
     async clickManageCategories(){
        await this.lnkApplicationLoc.click();
     }
     async clickAddCategory(){
        await this.btnAddCategoryLoc.click();
     }
     async enterCateName(name: string){
        await this.txtCateNameLoc.fill(name);
     }
     async enterDescription(describe: string){
        await this.txtDescriptionLoc.fill(describe);
     }
     async clickActive(){
        await this.chkActiveLoc.click();
     }
     async clickAddCate(){
        await this.btnAddLoc.click();
     }
}