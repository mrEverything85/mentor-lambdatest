import { test, expect } from '../../../core/fixture/api/register-fixture';

test.describe('User Registration API', () => {
    
    test('TC01: Verify user can successfully register a new learner user with valid data', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();

        const response = await registerAPI.registerAccount(testAccount);
        
        expect(response.body()).toBeTruthy();
        expect(response.status()).toBe(201);
    });

    test('TC02: Verify user cannot register duplicate email', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        await registerAPI.registerAccount(testAccount);
        
        const duplicateResponse: any = await registerAPI.registerAccount(testAccount);
        const responseBody = await duplicateResponse.json();

        expect(duplicateResponse.status()).toBe(400);
        expect(responseBody.detail).toContain('Email already exists');
    });

    test('TC03: Verify user cannot register with invalid email format', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        testAccount.Email = 'invalid.email';

        const response = await registerAPI.registerAccount(testAccount);
        expect(response.status()).toBe(400);
    });

    test('TC04: Verify user cannot register with invalid password', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        testAccount.Password = 'weak';

        const response = await registerAPI.registerAccount(testAccount);
        expect(response.status()).toBe(400);
    });

    test('TC05: Verify user cannot register without required fields (FullName)', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        testAccount.UserDetailsToAddDTO.FullName = '';

        const response = await registerAPI.registerAccount(testAccount);
        expect(response.status()).toBe(400);
    });

    test('TC06: Verify user cannot register account exceeding maximum field lengths (Bio)', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        testAccount.UserDetailsToAddDTO.Bio = 'a'.repeat(1001);

        const response = await registerAPI.registerAccount(testAccount);
        expect(response.status()).toBe(400);
    });

    test('TC07: Verify user cannot register account with invalid role types', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        testAccount.Role = 'InvalidRole' as any;

        const response = await registerAPI.registerAccount(testAccount);
        expect(response.status()).toBe(400);
    });

    test('TC08: Verify user cannot register account with invalid communication preferences', async ({ 
        registerAPI, 
        createUniqueTestAccount 
    }) => {
        const testAccount = createUniqueTestAccount();
        testAccount.UserDetailsToAddDTO.PrefferedComm = 'InvalidComm' as any;

        const response = await registerAPI.registerAccount(testAccount);

        expect(response.status()).toBe(400);
    });
});