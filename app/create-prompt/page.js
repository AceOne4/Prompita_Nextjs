"use client";

import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const createPrompt = () => {
  const { data } = useSession();
  const router = useRouter();
  const [submitting, setsubmitting] = useState();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: data?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <main>
      <Form
        type="CREATE"
        post={post}
        setpost={setPost}
        submitting={submitting}
        handlsubmit={handlesubmit}
      />
    </main>
  );
};

export default createPrompt;
