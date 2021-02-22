module.exports = {

  bind: '0.0.0.0',
  port: 3000,

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
  enableRegistration: true,
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
    connection: {
      filename: './db/braze.db'
    }
  }

}
