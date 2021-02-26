module.exports = {

  bind: '0.0.0.0',
  port: 3000,

  /**
   *  This is going to be changed in a future release!
   *  Sets the base URL that is used by axios for requests, as it
   *  isn't too smart and needs this to make requests. This will
   *  eventually be obtained automatically, but the code for it
   *  isn't yet finished. Keep an eye on this file for updates.
   */
  baseURL: 'http://127.0.0.1:3000',

  /**
   *  This is the secret that is used to sign authorisation tokens
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

  /**
   *  Whether to create an admin account. If one exists, setting
   *  this to true will reset the password.
   *  For this user, the username is 'admin'.
   */
  resetAdminPass: true,
  adminPassword: 'ChangeMeFirst!',

  /**
   *  Whether to enable users to register for their own accounts.
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

  /**
   *  The directories that Braze will use - they will be created if
   *  they do not exist.
   */
  folders: {
    // The working directory for magic operations, and temporary
    //   area for mods that haven't yet been assigned metadata
    work: './work',
    // The store for all mods managed by Braze
    repo: './repo'
  },

  /**
   *  This option will check signatures in the contents of uploaded
   *  archives, and throw an error on files that contain signatures
   *  in the blocklist.
   */
  signatureChecking: true,

  /**
   *  This list determines what files are allowed to be added to mods
   *  on Braze. Braze uses a fairly simple method of screening, which
   *  checks the first few bytes of a file, and compares it to the
   *  below list of magic numbers which are blocked.
   */
  blockedSignatures: {
    ms_executable: [0x4D, 0x5A],
    elf: [0x7F, 0x45, 0x4C, 0x46],
    shebang: [0x23, 0x21],
    llvm: [0x42, 0x43]
  },

  /**
   *  These options determine how the zip file will be stored before
   *  it is processed.
   *  'true'  - stores .zip files in the work directory
   *  'false' - keeps .zip file data in memory
   *  It is recommended to store the files on disk for systems which
   *  are low-memory, as full packs can be several gigabytes, all of
   *  which will need to be stored in RAM if set to false.
   */
  cacheZipFiles: {
    magic: true,
    solder: false,
    braze: false
  },

  /**
   *  This sets the naming scheme for uploaded zip files. The following
   *   variables can be used:
   *    ((filename)) - the filename that was uploaded
   *    ((author)) - the user that uploaded the file  - NYI
   *    ((date)) - the unix timestamp of the upload
   *    ((datehr)) - human readable date "ddMMyy-hhmmss"
   *    ((dateus)) - U.S. format date "MMddyy-hhmmss"
   *  The filename should not include the '.zip' extension. It will be
   *   added by Braze automatically.
   *  Subdirectories can also be added, for instance, to keep each
   *   user's uploads in their own folder, the following could be used:
   *    ((author))/((filename)).((datehr)) -> "admin/uploadedFile.260221-140323"
   */
  zipFileName: '((filename)).((datehr))', // <- Will create file "uploadedFile.260221-140323.zip"

  /**
   *  It is important that this is set up, as it is used by Braze
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
