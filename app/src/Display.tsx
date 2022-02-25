import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

type Image = {
  href: string;
  title: string;
  description: string;
};

const IMAGE_SEARCH = gql`
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

const IMAGE_NOT_FOUND_HREF =
  "https://lightwidget.com/wp-content/uploads/local-file-not-found-480x488.png";

function Display({ search }: { search: string }) {
  const [getImages, { loading, error, data }] = useLazyQuery(IMAGE_SEARCH);
  const [emptyDisplay, setEmptyDisplay] = useState(true);
  useEffect(() => {
    if (search !== "") {
      getImages({ variables: { q: search } });
      setEmptyDisplay(false);
      return;
    }

    setEmptyDisplay(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const renderTiles = (images: Image[]) => {
    if (images.length === 0) {
      return <p>No images found.</p>;
    }
    return images.map((item: Image) => (
      <img src={item.href || IMAGE_NOT_FOUND_HREF} alt={item.title} />
    ));
  };

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error Occurred</p>}
      {!emptyDisplay && data && renderTiles(data.nasa.collection)}
      {emptyDisplay && <p>^ Try entering a search</p>}
    </div>
  );
}

export default Display;
