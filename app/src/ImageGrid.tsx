import NewTabButton from "./NewTabButton";

type Image = {
  href: string;
  title: string;
  description: string;
};

type Props = {
  collection: Image[];
};

function ImageGrid({ collection }: Props) {
  const shortDescription = (description: string) => {
    let maxWords = 300;
    let isSpace = false;

    while (!isSpace) {
      if (
        description.length > maxWords &&
        description.charAt(maxWords) !== " "
      ) {
        maxWords++;
        continue;
      }
      isSpace = true;
    }

    return description.length > maxWords
      ? description.slice(0, maxWords).toString() + " ...."
      : description;
  };

  const renderTiles = (images: Image[]) => {
    return images.map((item: Image, index: number) => (
      <div className="max-w-sm rounded overflow-hidden shadow-lg" key={index}>
        <img className="w-full h-80" src={item.href} alt={item.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.title}</div>
          <p className="text-gray-700 text-base">
            {shortDescription(item.description)}
          </p>
          <NewTabButton link={item.href} />
        </div>
      </div>
    ));
  };

  return (
    <div>
      {collection.length === 0 && (
        <p className="text-center mx-6 py-5">No images found.</p>
      )}
      <div className="image-grid mx-6">{renderTiles(collection)}</div>
    </div>
  );
}

export default ImageGrid;
