import { ApolloError } from "@apollo/client";

export const formatErrorMessage = (error: ApolloError) => {
  let errorMessage = error.message;
  const code = error.graphQLErrors[0].extensions.code;
  switch (code) {
    case "NASA_API_INTERNAL_SERVICE_ERROR":
      errorMessage = `${error.message}, please try again later`;
      break;
    default:
      break;
  }
  return errorMessage;
};
