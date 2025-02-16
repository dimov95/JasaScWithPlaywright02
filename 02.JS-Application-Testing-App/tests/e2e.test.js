const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let bookTitle = "";

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    
    describe("authentication", () => {
        test ("1.1.1.	Registration with Valid Data ",async () =>  {
           //arrange
            
           await page.goto(host);
            await page.click("//a[text()='Register']");
            //act

            await page.waitForSelector("//form");
            let randomEmail = Math.floor(Math.random() * 10000);
            user.email = `testFromVarna_${randomEmail}@softuni.bg`;
            await page.fill("//input[@type='email']",user.email);
            await page.fill("//input[@name='password']",user.password);
            await page.fill("//input[@name='conf-pass']",user.password);
            await page.click("//button[@type='submit']");

            //assert
            await expect(page).toHaveURL(host + "/");
            await expect(page.locator("//a[@href='/logout']")).toBeVisible();


        } )

        test ("1.1.2. Login with Valid Data ", async () => {
            //arrange
            await page.goto(host);
            await page.click("//a[text()='Login']");
            
            //act
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']",user.email);
            await page.fill("//input[@name='password']",user.password);
            await page.click("//button[@type='submit']");
            
            //assert
            await expect(page).toHaveURL(host + "/");
            await expect(page.locator("//a[@href='/logout']")).toBeVisible();
        })
        test ("1.1.3 Logout from the Application ", async () => {
           //arrange of duty
            await page.goto(host);
            await page.click("//a[text()='Login']");
            
            //act
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']",user.email);
            await page.fill("//input[@name='password']",user.password);
            await page.click("//button[@type='submit']");
            await page.click("//a[text()='Logout']");
            
             //assert
             await expect(page).toHaveURL(host);
             await expect(page.locator("//a[@href='/login']")).toBeVisible();


        })
        
    });

    describe("navbar", () => {
        test ("1.2.1.Navigation for Logged-In User Testing", async () => {
            //arrange of duty
            await page.goto(host);
            await page.click("//a[text()='Login']");
            
            //act
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']",user.email);
            await page.fill("//input[@name='password']",user.password);
            await page.click("//button[@type='submit']");

            //assert
            await expect(page.locator("//a[text()='Home']")).toBeVisible;
            await expect(page.locator("//a[text()='Collection']")).toBeVisible;
            await expect(page.locator("//a[text()='Search']")).toBeVisible;
            await expect(page.locator("//a[text()='Create Book']")).toBeVisible;
            await expect(page.locator("//a[text()='Logout']")).toBeVisible;
            
            await expect(page.locator("//a[text()='Login']")).toBeHidden;
            //await expect(page.locator(`//a[text()='Register']`, {hasCount: (0)}));
            await expect(page.locator("//a[text()='Register']")).toHaveCount(0);

        })

        test("1.2.5.Navigation for Guest User Testing", async () => {

              //arrange of duty
              await page.goto(host);
        
              
              //act non
              
            
              //assert
              await expect(page.locator("//a[text()='Create Book']")).toBeHidden;
              await expect(page.locator("//a[text()='Logout']")).toBeHidden;
              
              await expect(page.locator("//a[text()='Home']")).toBeVisible;
              await expect(page.locator("//a[text()='Collection']")).toBeVisible;
              await expect(page.locator("//a[text()='Search']")).toBeVisible;
              await expect(page.locator("//a[text()='Login']")).toBeVisible;
              await expect(page.locator("//a[text()='Register']")).toHaveCount(1);
              //await expect(page.locator(`//a[text()='Register']`, {hasCount: (0)}));
  
        })
        
    });

    describe("CRUD", () => {

        describe("CRUD", () => {
            beforeEach(async () => {
                await page.goto(host);
                await page.click("//a[text()='Login']");
                
                // act
                await page.waitForSelector("//form");
                await page.fill("//input[@name='email']", user.email);
                await page.fill("//input[@name='password']", user.password);
                await page.click("//button[@type='submit']");
            });
        
            let randomNum = Math.floor(Math.random() * 100000);
            let title = `Book N:${randomNum}`;
        
            test("1.3.6. Create a Book Testing", async () => {
                // arrange
                await page.click("//a[text()='Create Book']");
                await page.waitForSelector("//form");
                await page.fill("//input[@id='title']", title);
                
                let images = ["./images/1984.jpg", "./images/background.webp", "./images/random_cover.webp", "./images/theGreatGatsby.jpg", "./images/toKillAMockingbird.jpg"];
                for (let randomImage of images) {
                    await page.fill("//input[@id='coverImage']", randomImage);
                }
        
                await page.fill("//input[@id='year']", "10");
                await page.fill("//input[@id='author']", "SoftUni");
                await page.fill("//input[@id='genre']", "Something");
                await page.fill("//textarea[@name='description']", "Nothing");
                await page.click("//button[@class='save-btn']");
        
                // assert
                await expect(page).toHaveURL("http://localhost:3000/collection");
                await expect(page.locator(`//div[@class="book-details"]//h2[text()='${title}']`)).toBeVisible();
            });
        
            test("1.3.7.Edit a Book Testing", async () => {
                // arrange
                await page.click("//a[text()='Collection']");
                await page.click(`//div[@class='book']//h2[text()='${title}']//following-sibling::a`);
                await page.click("//a[@id='details']");
                await page.waitForSelector("//form");
                
                // Промяна на стойността на title
                title += "_123";
                // act
                await page.fill("//input[@name='name']", title);
                await page.click("//button[@class='save-btn']");
                
                // assert
                await expect(page.locator(`//h1[text()='${title}']`)).toBeVisible();
            });
        
            test("1.3.8. Delete a Book Testing", async () => {
                // arrange
                await page.click("//a[text()='Search']");
                await page.waitForSelector("//form");
                await page.click("//input[@type='text']");
                
                // Използване на променливата title
                await page.fill("//input[@name='email']", title);
                await page.click("//button[@type='submit']");
                await page.click(`//a[text()='${title}']`);
                await page.click("//a[@class='delete-btn']");
        
                // assert
                await expect(page.locator(`//a[text()='${title}']`)).toHaveCount(0);
            });
        });
        
    });
});