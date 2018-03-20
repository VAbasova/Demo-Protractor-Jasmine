import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { BasePage } from './base';

/**
 * Class creates a new Popular series page
 * @extends BasePage
 */
export class PopularSeries extends BasePage {
   private allMovies = $$('app-popular-series > div > div > div.col-sm-6.col-md-4.col-lg-3.col-xs-6');
   public SECTION_LINK = 'https://movies-finder.firebaseapp.com/popular/series';
   public SECTION_HEDER = 'Popular Series';
   
   /**
    * Waits for loading the page
    */
   async pageLoaded() {
        await browser.wait(EC.and
            (EC.visibilityOf(this.allMovies.last()),
            EC.invisibilityOf(this.searchField)), 20000, 'popular series should appear in 20 seconds, but it doesnt')
    }

    /**
    * Gets the header of section
    * @returns {string} - The header of section
    */
    async getSectionHeader() {
        return this.sectionHeader.getText();
    }
}

