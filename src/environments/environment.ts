// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDKbvUGKv84x4HITbNZUCHC9f4hg3eEVB0',
        authDomain: 'dashdb-b6d19.firebaseapp.com',
        databaseURL: 'https://dashdb-b6d19.firebaseio.com',
        projectId: 'dashdb-b6d19',
        storageBucket: 'dashdb-b6d19.appspot.com',
        messagingSenderId: '620085504134',
        appId: '1:620085504134:web:17a5cf44264bfe42564907'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
