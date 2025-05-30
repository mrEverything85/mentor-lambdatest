import {test} from "../../../core/fixture/ui/login-fixture";
import { ApplicationPage } from "../../../pages/application/aplication-review.page";


test.describe('Application review', () =>{
  let aplicationPage : ApplicationPage;
   test.beforeEach(async ({ loginAs, page })=> {
    await loginAs("admin");
    aplicationPage = new ApplicationPage(page);

  });
test("Verify successful approve application", async()=>{
    await test.step("1. Navigate to the Mentor Approvals page", async()=>{
      await aplicationPage.clickApplication();
    });
    await test.step("2. Choose a pending application to review", async()=>{
      await aplicationPage.clickPendingApplications();
    });
    await test.step("3. Approve a pending application", async()=>{
      await aplicationPage.clickApprove();
    });
})
})