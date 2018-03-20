import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';

/**
 * Class contains common base page logic
 */
export class BasePage {
    public searchField = $('input[name="searchStr"]');
    public sectionHeader = $('h3.orange-text');
}