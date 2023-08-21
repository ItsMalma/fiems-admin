import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchProps = {
  placeholder?: string;
};

export default function Search(props: SearchProps) {
  return (
    <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 flex items-center gap-3">
      <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
      <input
        type="search"
        className="flex-grow outline-none bg-inherit"
        placeholder={props.placeholder ?? "Search"}
      />
    </div>
  );
}