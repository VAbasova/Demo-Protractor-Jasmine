import { browser, $, $$, element, by, By, ExpectedConditions as EC} from 'protractor';
import { WSAEACCES } from 'constants';
import { HomePage } from '../pages/home';
import { currentId } from 'async_hooks';

describe('Popular series', async function () {
    const homePage = new HomePage();

    beforeEach(async function () {
        await browser.manage().timeouts().implicitlyWait(1000);
        await homePage.open();  
    })

    it('shouldnt have search bar', async function () {
        let searchBar = $('div.jumbotron');
        
        await searchBar.isDisplayed;
        await homePage.openPopularSeries()
       
        expect(await searchBar.isPresent()).toBeFalsy;
    })

    it('should have "First Air Date" instead "Release Date"', async function () {
        let reliseDateLocator = $$('p strong ').first();

        expect(await reliseDateLocator.getText()).toContain('Release Date:');
        homePage.openPopularSeries()
        await browser.wait(EC.visibilityOf(reliseDateLocator), 20000, 'First movie card should appear in 20 seconds, but it doesnt');
       
        expect(await reliseDateLocator.getText()).toContain('First Air Date:');
    })
})