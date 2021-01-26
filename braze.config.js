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
  repoSubdir: 'repo'

}
