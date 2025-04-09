const bcrypt = require('bcrypt');

const plainTextPassword = 'testpassword';
const saltRounds = 10; // Use the same number of salt rounds as before

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
    } else {
        console.log('Generated hash:', hash);
    }
});
