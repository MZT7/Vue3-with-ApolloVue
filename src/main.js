import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "./style.css";
import App from "./App.vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import router from "./router";
const csrfToken = "";
document.addEventListener("DOMContentLoaded", function () {
  csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://laravel-with-graphql-production.up.railway.app/graphql",
  headers: {
    "X-CSRF-TOKEN": csrfToken, // Include the CSRF token here
  },
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router);

app.mount("#app");
