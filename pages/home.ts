import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { BasePage } from './base';
import { PopularSeries } from './popularSeries';
import { UpcomingMovies } from './upcomingMovies';
import { MovieDetailsPage } from './movieDetails'

/**
 * Class creates a new home page
 * @extends BasePage
 */
export class HomePage extends BasePage {
    private firstMovieOnPage = $$('movie-card').first();
    private foundMovies = $$('movies > div > div.row.is-flex movie-card');
    private popularSeriesSectionNavigatonButton = element(by.partialLinkText('Popular Series')); //$('a[routerlink*="popular/series"]');
    private upcomingMoviesSectionNavigatonButton = element(by.partialLinkText('Upcoming')); //$('a[routerlink*="upcoming"]');
    public LINK = 'https://movies-finder';
           
    /**
     * Opens home page
     */
    async open() {
        await browser.get('/', 1000);
    }
 
    /**
     * Searches for search request
     * @param search_request - The search request value
     */
    async searchFor(search_request: string | number) {
        await this.searchField.sendKeys(search_request, Key.ENTER);
        await browser.wait(EC.visibilityOf(this.firstMovieOnPage), 20000, 'movies should appear in 20 seconds, but it doesnt');
    }

    /**
     * Gets titles of found movies
     * @returns {string[]} - Array of titles of found movies
     */
    async getFoundMoviesTitles() {
        await browser.wait(EC.visibilityOf(this.firstMovieOnPage), 20000, 'movies should appear in 20 seconds, but it doesnt');
        return this.foundMovies.$$('a[title]').getAttribute('title');
    }
 
    /**
     * Gets title of the movie
     * @param [movieLocator = firstMovieOnPage] - Locator of a movie
     * @returns {string} - Title of the movie
     */
    async getMovieTitle(movieLocator = this.firstMovieOnPage) {
        return await movieLocator.$('a[title]').getAttribute('title');
    }

    /**
     * Gets raiting of the movie
     * @param [movieLocator = firstMovieOnPage] - Locator of a movie
     * @returns {float} - Raiting of the movie
     */
    async getMovieRiting(movieLocator = this.firstMovieOnPage) {
        return parseFloat(await movieLocator.$('small').getText());
    }

    /**
     * Gets href of the movie
     * @param [movieLocator = firstMovieOnPage] - Locator of a movie
     * @returns {string} - Href of the movie
     */
    async getMovieHref(movieLocator = this.firstMovieOnPage) {
        return await movieLocator.$('a[title]').getAttribute('href');
    }

    /**
     * Opens detils page for the movie
     * @param [movieLocator = firstMovieOnPage] - Locator of a movie 
     * @returns - New Movie details page
     */
    async openMovieDetails(movieLocator = this.firstMovieOnPage) {
        movieLocator.$('.text-ellipsis a').click();
        const mdPage = new MovieDetailsPage();
        await mdPage.pageLoaded();

        return mdPage;
    }   

    /**
     * Opens Popular Series page
     * @returns - New Popular Series page
     */
    async openPopularSeries() {
        this.popularSeriesSectionNavigatonButton.click();
        const psPage = new PopularSeries();
        await psPage.pageLoaded();

        return psPage;
    }
    
    /**
     * Opens Upcoming Movies page
     * @returns - New Upcoming Movies page
     */
    async openUpcomingMovies() {
        this.upcomingMoviesSectionNavigatonButton.click();
        const umPage = new UpcomingMovies();
        await umPage.pageLoaded();

        return umPage;
    }   
}

