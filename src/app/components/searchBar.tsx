"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<{title: string, id: number}[]>([]);
  const [searchSuggestionMenu, setSearchSuggesionMenu] = useState(false);

  const [category, setCategory] = useState<string | null>(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const setCategories = (e: React.MouseEvent<HTMLElement>, selected: string) => {
    const elements = document.querySelectorAll("[data-category]");

    elements.forEach((el) => {
      el.classList.remove("bg-blue-300", "text-gray-50", "rounded-xl");
      el.setAttribute("data-set", "false");
    });

    if (category === selected) {
      setCategory(null);
      return;
    }

    e.currentTarget.classList.add("bg-blue-300", "text-gray-50", "rounded-xl");
    e.currentTarget.setAttribute("data-set", "true");
    setCategory(selected);

    searchUpdate();
  };

  const searchUpdate = async () => {
    let url = "/api/games?";
    if (category) {
      url += `genre=${encodeURIComponent(category)}&`;
    }
    url += `title=${encodeURIComponent(search)}`;

    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    console.log("data: ", data);
    setSearchSuggestions(data);
  };

  const suggestionSearch = (id: number) => {
    setSearchSuggesionMenu(true);
    console.log(`redirect to id:${id}`);
    router.push(`/games/${id}`);
  }

  const handleSubmit = async () => {
  };

  return (
        <div className="flex justify-center">
          <div className="flex flex-row-reverse bg-gray-200 rounded-xl mt-2 w-1/4 h-8 justify-between">
            <div className="flex flex-row rounded-r-2xl h-full">
              <input
                onBlur={()=>  {
                  setTimeout(() => {
                    setSearchSuggesionMenu(false)
                  }, 500)}}
                onFocus={() => setSearchSuggesionMenu(true)}

                onChange={(e) => {
                    setSearch(e.target.value);
                    searchUpdate()
                }}
                className="h-full w-4/5 text-xl text-center border-none outline-none text-gray-800"
                placeholder="Search..."
              />
              <img
                className="text-red-500 stroke-current"
                width={24}
                src="/search.svg"
                onClick={handleSubmit}
              />
            </div>
            <div
              className="flex bg-blue-400 rounded-lg items-center justify-center align-top w-2/5"
              onClick={() => setCategoryDropdown(!categoryDropdown)}
            >
              <h1 className="align-bottom select-none w-14 text-gray-50 mr-10 font-bold text-xl">
                Category
              </h1>
              <img className="invert" src="/dropdown.svg" width={24} />
            </div>
          </div>

          <div
            className={`
              ${searchSuggestionMenu ? "fixed" : "hidden"}
              left-10/20 -translate-x-1/6
              bg-white
              w-60
              top-10
              border border-gray-300
              z-54
              shadow-md
              border-t-0
              rounded-2xl
              rounded-t-none
              font-bold
              text-lg
              
              text-gray-600
            `}
            style={{height: `${searchSuggestions.length * 30}px`}}
          >
            <ul className={`
              flex flex-col items-center`}>
                
              {searchSuggestions.map((item, index) => (
                <li onClick={() => { setSearchSuggesionMenu(true); suggestionSearch(item.id)}} key={index}>{item.title}</li>
              ))

              }
            </ul>
          </div>

          <div
            className={`
              ${categoryDropdown ? "fixed" : "hidden"}
              left-8/20 -translate-x-1/4
              top-10
              w-40 h-72
              bg-white
              border border-gray-300
              rounded-t-none
              border-t-0
              rounded-2xl
              z-[0]
              text-gray-600
              shadow-md
              flex flex-col
              items-center
              font-bold
              text-lg
              justify-between
              p-1
            `}
          >
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "Shooter")}
            >
              Shooter
            </h1>
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "MMO")}
            >
              MMO
            </h1>
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "MMORPG")}
            >
              MMORPG
            </h1>
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "Strategy")}
            >
              Strategy
            </h1>
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "Social")}
            >
              Social
            </h1>
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "MOBA")}
            >
              MOBA
            </h1>
            <h1
              data-category
              data-set={false}
              className="select-none p-1 mr-12"
              onClick={(e) => setCategories(e, "Other")}
            >
              Other
            </h1>
          </div>
        </div>
  );
}
