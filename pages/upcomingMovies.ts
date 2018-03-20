import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { BasePage } from './base';

/**
 * Class creates a new Upcoming movies page
 * @extends BasePage
 *
 */
export class UpcomingMovies extends BasePage {
    private allMovies = $$('app-upcoming  movie-card');
    public SECTION_LINK = 'https://movies-finder.firebaseapp.com/upcoming';
    public SECTION_HEDER = 'Up Coming Movies';
   
   /**
    * Waits for loading the page
    */
    async pageLoaded() {
        await browser.wait(EC.and
            (EC.visibilityOf(this.sectionHeader),
            EC.visibilityOf(this.allMovies.last())), 20000, 'upcoming movies should appear in 20 seconds, but it doesnt')
    }

    /**
    * Gets the header of section
    * @returns {string} - The header of section
    */
    async getSectionHeader() {
        return this.sectionHeader.getText();
    }
}