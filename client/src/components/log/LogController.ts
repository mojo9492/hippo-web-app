import { Post } from "../../models";
import { MBP_END } from "../../models/Core";

export async function getEntries(id: number): Promise<Post[]> {
  const response = await fetch(`${MBP_END}/post/${id}`);
  if (!response.ok) {
    throw new Error("could not find posts");
  }
  return await response.json();
}
export async function postEntry(post: Post) {
  const response = await fetch(`${MBP_END}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error("could not add post: " + data.body);
  }
  return await response.json();
}

export async function deleteEntry(id: string) {
  const deleteResult = await fetch(`${MBP_END}/post/${id}`, {
    method: "DELETE",
  });
  if (!deleteResult.ok) {
    const { body } = await deleteResult.json();
    const error = new Error();
    error.name = "Delete Post" + id;
    error.message = "could not delete post" + body;
    throw error;
  }
  return await deleteResult.json();
}
