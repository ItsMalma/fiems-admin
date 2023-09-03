import { Search as SearchIcon } from "react-bootstrap-icons";

type SearchProps = {
  placeholder?: string;
};

export default function Search(props: SearchProps) {
  return (
    <div className="px-3 py-[9px] 2xl:px-4 2xl:py-3 rounded-[10px] bg-gray-100 text-gray-400 flex items-center gap-3 2xl:gap-4">
      <SearchIcon />
      <input
        type="search"
        className="flex-grow outline-none bg-inherit"
        placeholder={props.placeholder ?? "Search"}
      />
    </div>
  );
}
