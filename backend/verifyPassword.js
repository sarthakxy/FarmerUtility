const bcrypt = require('bcrypt');

// Plain-text password to verify
const plainTextPassword = 'testpassword';

// Stored hash for the password (from your `db.js`)
const storedHash = '$2b$10$3qhl4.w0eP40gh3drkCFYesL7iEdVXikueIEssrGAWEB.pd/yVFJ.';

// Debug logs to check inputs
console.log("Plaintext password:", plainTextPassword);
console.log("Stored hash:", storedHash);

// Use bcrypt.compare to verify
bcrypt.compare(plainTextPassword, storedHash, (err, result) => {
    if (err) {
        console.error('Error during password verification:', err);
    } else if (result) {
        console.log('Password verification successful: Match!');
    } else {
        console.log('Password verification failed: No match.');
    }
});
