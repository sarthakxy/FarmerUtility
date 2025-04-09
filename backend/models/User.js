class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password; // In production, hash this password.
    }
}

module.exports = User;
