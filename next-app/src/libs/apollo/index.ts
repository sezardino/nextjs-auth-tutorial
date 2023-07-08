import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const getClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "same-origin",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};
