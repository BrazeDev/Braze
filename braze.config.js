module.exports = {

  bind: '0.0.0.0',
  port: 3000,

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
