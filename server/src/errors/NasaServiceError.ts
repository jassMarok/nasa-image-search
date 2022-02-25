import { ApolloError } from "apollo-server-errors";

export class NasaServiceError extends ApolloError {
  constructor(message: string) {
    super(message, "NASA_API_INTERNAL_SERVICE_ERROR");
    Object.defineProperty(this, "name", { value: "NasaServiceError" });
  }
}
