import { Page, expect } from "@playwright/test";
import { BasePage } from "../base-page";

export class ApplicationPage extends BasePage {
    private lnkApplication = this.page.getByRole('link', { name: 'Mentor Approvals' });
    private lblApplication = this.page.locator('.md\\:col-span-1 > .overflow-y-auto > div').first();
    private btnApprove = this.page.getByRole('button', { name: 'Approve', exact: true });
    private btnReject = this.page.getByRole('button', { name: 'Reject', exact: true });
    private btnRequestInfo = this.page.getByRole('button', { name: 'Request More Info' });
    constructor(page: Page){
        super(page);
    }
  async clickApplication(){
    await this.lnkApplication.click();
  }
  async clickPendingApplications(){
    await this.lblApplication.click();
  }
  async clickApprove(){
    await this.btnApprove.click();
  }
  async clickReject(){
    await this.btnReject.click();
  }


}