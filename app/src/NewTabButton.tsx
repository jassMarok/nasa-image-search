import { ReactComponent as NewTabIcon } from "./assets/new-tab.svg";

function NewTabButton({ link }: { link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      className="bg-gray-300 my-3 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      rel="noreferrer"
    >
      <NewTabIcon />
      <span className="ml-3">Open Full size</span>
    </a>
  );
}

export default NewTabButton;
