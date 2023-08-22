"use client";
import type { NextComponentType } from "next";
import TextEditor from "./TextEditor";

const AddPost: NextComponentType = () => {
  return (
    <>
      <h4>Add Post component</h4>
      <TextEditor />
    </>
  )
}

export default AddPost