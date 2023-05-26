"use client";

import Form from "@components/Form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const router = useRouter();
  const [submitting, setsubmitting] = useState();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getpromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getpromptDetails();
  }, [promptId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    if (!promptId) return;
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
        type="Edit"
        post={post}
        setpost={setPost}
        submitting={submitting}
        handlsubmit={handleUpdate}
      />
    </main>
  );
};

export default EditPrompt;
