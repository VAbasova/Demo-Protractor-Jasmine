require('ts-node').register();
// Report portal config
const ReportportalAgent = require('agent-js-jasmine');

const agent = new ReportportalAgent({
    token: "d275cc6e-6e8f-4fb2-bc51-05af49342621",
    endpoint: "http://35.204.111.110:8080/api/v1",
    launch: "Valery",
    project: "5-startit-movie-finder",
    attachPicturesToLogs: false
});

module.exports.config = {
    specs: ['spec.ts', 'specs/*.ts'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    onPrepare: async function () {
        // REPORT PORTAL
        jasmine.getEnv().addReporter(agent.getJasmineReporter());
    },
    
    // RP hack to finish correctly. This will wait for RP to finish all http requests
    afterLaunch: () => {
    return agent.getExitPromise();
    }
}