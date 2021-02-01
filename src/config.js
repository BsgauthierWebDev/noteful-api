module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DATABASE_URL: process.env.DATABASE_URL || 'https://infinite-spire-48431.herokuapp.com',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/noteful-test'
}