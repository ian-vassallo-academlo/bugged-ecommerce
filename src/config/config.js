require('dotenv').config();

module.exports = {
  "development": {
    use_env_variable: "DATABASE_URL",
    testing: false
  },
  "test": {
    use_env_variable: "DATABASE_URL",
    testing: false
  },
  "production": {
    use_env_variable: "DATABASE_URL",
    testing: false
  }
}
