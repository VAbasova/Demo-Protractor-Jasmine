import { browser, $, $$, element, by} from 'protractor';
import { HomePage } from '../pages/home';

describe('Movie card ', async function(){
    const homePage = new HomePage();
       
    beforeEach(async function(){
        await homePage.open();     
    })
    
    it('should have name', async function(){
        expect(typeof(await homePage.getMovieTitle())).toBe('string');
    })

    it('should have "raiting" pointer', async function(){
        //Verify that the "raiting" pointer' movie card is a number
        expect(await homePage.getMovieRiting()).not.toBeNaN;
    }) 

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        let movieCardTitle = await homePage.getMovieTitle();
        let movieCardHref = await homePage.getMovieHref();
        
        const detailsPage = await homePage.openMovieDetails();
                
        expect(await browser.getCurrentUrl()).toEqual(movieCardHref); 
        expect(await detailsPage.getMovieHeader()).toContain(movieCardTitle);
    })
})