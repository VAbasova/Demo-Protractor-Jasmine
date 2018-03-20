import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { BasePage } from './base';

/**
 * Class creates a new Movie details page
 * @extends BasePage
 */
export class MovieDetailsPage extends BasePage {
   private movieHeader = $('app-movie > div:nth-child(1) > div.col-md-8 > h2');
   private movieRaiting = $('app-movie h2 > small');
   private similarMovies = $$('app-movie > div.row.is-flex > div > movie-card');
   private actors = $$('app-movie > div > div.col-md-8 > div > div.col-md-3');
   private reviews = $$('app-movie blockquote');
   
   /**
    * Waits for loading the page
    */
   async pageLoaded() {
        await browser.wait(EC.visibilityOf(this.similarMovies.last()), 10000, 'movie details page should open in 10 seconds, but it doesnt');
    }   

   /**
    * Gets the header of opened movie detais page
    * @returns {string} - The header of the movie
    */
    async getMovieHeader() {
        await browser.wait(EC.visibilityOf(this.movieHeader), 10000, 'movie header should appear in 10 seconds, but it doesnt');
        return await this.movieHeader.getText();
   }
   
   /**
     * Gets raiting of the movie
     * @returns {float} - Raiting of the movie
     */
   async getMovieRaiting() {
        return parseFloat(await this.movieRaiting.getText());
   }

   /**
     * Gets titles of similar movies
     * @returns {string[]} - Array of titles of similar movies
     */
   async getSimilarMoviesTitles() {
        return this.similarMovies.$$('a[title]').getAttribute('title');
    }

    /**
     * Gets names of actors in Cast block
     * @returns {string[]} - Array of actor names
     */
    async getActorNames() {
        return this.actors.$$('a').getText();
    }

    /**
     * Gets review texts in Review block
     * @returns {string[]} - Array of texts
     */
    async getReviewTexts() {
        return this.reviews.$$('p').getText();
    }

    /**
     * Gets review sources in Review block
     * @returns {string[]} - Array of links
     */
    async getReviewSources() {
        let reviewSources: any = await this.reviews.$$('cite a').getAttribute('href');
        return reviewSources;
    }
}