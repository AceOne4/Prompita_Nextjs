"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setpost] = useState();
  const [filteredPosts, setfilteredPosts] = useState();
  const handlSeachchnge = (e) => {
    setSearchText(e.target.value.toLowerCase());
    const filtered = post.filter(
      (p) =>
        p.prompt.toLowerCase().includes(searchText) ||
        p.tag.toLowerCase().includes(searchText) ||
        p.creator.username.toLowerCase().includes(searchText)
    );
    setfilteredPosts(filtered);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setpost(data);
    };
    fetchPosts();
  }, []);
  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filteredTag = post.filter((p) => p.tag === tag);

    setfilteredPosts(filteredTag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handlSeachchnge}
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText === "" ? post : filteredPosts}
        handleTagClick={handleTagClick}
      ></PromptCardList>
    </section>
  );
};

export default Feed;
