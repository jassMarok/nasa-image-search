import { UserInputError } from "apollo-server-errors";
import { objectType, extendType, stringArg, intArg, nonNull } from "nexus";
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
          throw new UserInputError("Bad input error, search arg not provided");
        }

        try {
          let currentPage = args.from ? args.from : 1;
          const response = await NasaImageService.getImages({
            search: args.q,
            from: currentPage,
          });

          const { data } = response;
          const feed: any = [];
          let totalPages = Math.ceil(
            data.collection.metadata["total_hits"] / 100
          );

          // Simple formatted data
          data.collection.items.forEach((item: any) => {
            const title = item.data[0].title || "Title not provided";
            const description =
              item.data[0].description ||
              item.data[0]["description_508"] ||
              "Description not provided";
            const href = item.links[0].href || "";
            feed.push({
              title,
              description,
              href,
            });
          });

          return {
            collection: feed,
            totalPages,
            currentPage,
          };
        } catch (error) {
          throw new Error("An error occurred for query images");
        }
      },
    });
  },
});
