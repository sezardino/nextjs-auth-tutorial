import { gql, useQuery } from "@apollo/client";

const getMeQUery = gql`
  query getMe {
    me {
      _id
      email
    }
`;

export const useGetMeQuery = () => useQuery(getMeQUery);
