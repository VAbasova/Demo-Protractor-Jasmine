import { browser, $, $$, element, by, By, ExpectedConditions as EC} from 'protractor';
import { WSAEACCES } from 'constants';
import { HomePage } from '../pages/home';
import { currentId } from 'async_hooks';

describe('Movie details', async function () {
    const homePage = new HomePage();

    beforeEach(async function () {
        await homePage.open();       
    })

    it('should have movie name as header', async function () {
        let movieCardTitle = await homePage.getMovieTitle();      
        const detailsPage = await homePage.openMovieDetails();
        
        expect(await detailsPage.getMovieHeader()).toContain(movieCardTitle);
    })

    it('should have raiting', async function () {  
        const detailsPage = await homePage.openMovieDetails();
                
        //Verify that raiting value is a number
        expect(await detailsPage.getMovieRaiting()).not.toBeNaN;
    })

    it('should have simular movies block with atleast one movie', async function () {
        const detailsPage = await homePage.openMovieDetails();
        let similsrMoviesTitles = await detailsPage.getSimilarMoviesTitles();
                
        expect(await similsrMoviesTitles.length).toBeGreaterThan(0, 'there is no movies in simular movies block');
    })

    describe('cast block', async function () {
        let detailsPage;

        beforeEach(async function () {
            detailsPage = await homePage.openMovieDetails();  
        })

        it('should show atleast one actor', async function () {
            let actorNames = await detailsPage.getActorNames();
                          
            expect(await actorNames.length).toBeGreaterThan(0, 'there is no actors in cast block');
        })
    })

    describe('reviews block', function () {
        let detailsPage;

        beforeEach(async function () {
            detailsPage = await homePage.openMovieDetails();   
        })

        it('should be atleast one review', async function () {
            let reviews = await detailsPage.getReviewTexts();
        
            expect(await reviews.length).toBeGreaterThan(0, 'there is no reviews in reviews block');
        })

        it('should have reviewer name as link to source', async function () {
            let reviewSourceLinks = await detailsPage.getReviewSources();

            reviewSourceLinks.forEach(sourceLink => {
                expect(sourceLink).not.toContain(homePage.LINK);
            })
        })
    })
})
