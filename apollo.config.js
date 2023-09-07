module.exports = {
  client: {
    service: {
      name: "Laravel",
      // URL to the GraphQL API
      // url: "http://localhost:8000/graphql",
      url: "https://laravel-with-graphql-production.up.railway.app/graphiql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
