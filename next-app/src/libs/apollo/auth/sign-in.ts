import { gql } from "@apollo/client";
import { getClient } from "..";

const signInQuery = gql`
  mutation SignIn($input: UserInput!) {
    signIn(input: $input) {
      _id
      email
    }
  }
`;

export const signInHandler = async (email: string, password: string) => {
  const client = getClient();

  return await client.mutate({
    mutation: signInQuery,
    variables: { input: { email, password } },
  });
};
