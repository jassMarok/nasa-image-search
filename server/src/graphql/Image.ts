import { UserInputError } from "apollo-server-errors";
import { objectType, extendType, stringArg, intArg, nonNull } from "nexus";
import { NasaResponseImage } from "../../types";
import { NasaServiceError } from "../errors/NasaServiceError";
import NasaImageService from "../services/NasaImageService";

export const Image = objectType({
  name: "Image",
  definition(t) {
    t.nonNull.string("href");
    t.nonNull.string("description");
    t.nonNull.string("title");
  },
});

export const ImageSearchResult = objectType({
  name: "SearchResult",
  definition(t) {
    t.nonNull.list.field("collection", { type: "Image" }),
      t.nonNull.int("totalPages"),
      t.nonNull.int("currentPage");
  },
});

export const ImageQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("nasa", {
      type: "SearchResult",
      args: {
        q: nonNull(stringArg()),
        from: intArg(),
      },
      async resolve(parent, args, context, info) {
        if (!args.q) {
          throw new UserInputError("Search query invalid", {
            argumentName: "q",
          });
        }

        try {
          let currentPage = args.from ? args.from : 1;
          const response = await NasaImageService.getImages({
            search: args.q,
            from: currentPage,
          });

          const { data } = response;

          let totalPages = Math.ceil(
            data.collection.metadata["total_hits"] / 100
          );

          // Simple formatted data
          const collection: any = [];
          data.collection.items.forEach((item: NasaResponseImage) => {
            collection.push(NasaImageService.extractImageData(item));
          });

          return {
            collection,
            totalPages,
            currentPage,
          };
        } catch (error) {
          throw new NasaServiceError(
            "An internal error occurred while fulfilling the request"
          );
        }
      },
    });
  },
});
