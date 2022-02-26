import { gql } from "@apollo/client";

export const IMAGE_SEARCH = gql`
  query ImageSearchQuery($q: String!, $from: Int) {
    nasa(q: $q, from: $from) {
      collection {
        href
        description
        title
      }
      currentPage
      totalPages
    }
  }
`;
