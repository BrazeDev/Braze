module.exports = {

  bind: '0.0.0.0',
  port: 3000,

  /**     This is going to be changed in a future release!
   *  Sets the base URL that is used by axios for requests, as it
   *  isn't too smart and needs this to make requests. This will
   *  eventually be obtained automatically, but the code for it
   *  isn't yet finished. Keep an eye on this file for updates.
   */
  baseURL: 'http://127.0.0.1:3000',

  /** This is the secret that is used to sign authorisation tokens
   *  and should be kept 100% secret.
   *  A malicious actor with this secret could create tokens for
   *  any user, and make them valid for any amount of time.
   *  RECOMMENDED:
   *   Leave this field blank, and set your JWT secret as an
   *   environment variable:
   *   - JWT_SECRET=ABCDEFG npm start
   *   Or if using docker:
   *   - docker run ... -e JWT_SECRET=ABCDEFG ...
   */
  jwtSecret: 'XwD48UY5ymQJuMP_This_is_an_example_key_do_not_use_NZJhKLJrUDa5S8W',

  /** Whether to create an admin account. If one exists, setting
   *  this to true will reset the password.
   *  For this user, the username is 'admin'.
   */
  resetAdminPass: true,
  adminPassword: 'ChangeMeFirst!',

  /** Whether to enable users to register for their own accounts.
   *  It is recommended that you also enable the email address
   *  verification if you leave this enabled, as it will prevent
   *  the mass creation of spam accounts.
   *  blockBurnerDomains - checks email addresses against a known
   *   list of domains that provide short-term temporary email
   *   addresses
   *  performMXLookup - checks to ensure the email address belongs
   *   to a correctly configured mail server
   */
  enableRegistration: false,
  blockBurnerDomains: true,
  performMXLookup: true,

  /* Whether or not the bundled repo server will be run */
  bundledRepo: true,

  /** This section only applies if using the bundled repo server
   *  The subdirectory on the webserver from where the repo will
   *    be hosted.
   *  http://your-server:3000/<repoSubdir>
  */
  repoSubdir: 'repo',

  /** It is important that this is set up, as it is used by Braze
   *    to store settings and other info.
   *  If you're unsure, leave this as default, or check the link
   *    below for info regarding syntax.
   */
  dbConnection: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/braze.db'
    }
  }

}
