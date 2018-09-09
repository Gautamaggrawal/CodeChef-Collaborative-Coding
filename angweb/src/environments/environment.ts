// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  codeChefLoginUrl: 'https://api.codechef.com/oauth/authorize?response_type=code&client_id=21a85d79b82b47b5f2b4041de91efd2f&state=xyz&redirect_uri=http://localhost:3000/oauth/codechef',
  codeChefBaseUrl: "https://api.codechef.com"
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
