import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../component/Button";
import InnerContainer from "./InnerContainer";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  height: 70vh;
  width: 100%;
  margin-top: 150px;
`;

const BaseInput = styled.textarea`
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  width: 100%;
  font-size: 18px;
  height: 40vh;
`;

const TitleInput = styled(BaseInput)`
  height: 10vh;
`;

const PostButton = styled(StyledButton)`
  margin: 0 10px;
`;

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    await addDoc(collection(db, "posts"), {
      title,
      content,
      authorId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
    navigate("/board");
  };

  return (
    <InnerContainer>
      <PostContainer>
        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <BaseInput
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <PostButton onClick={handlePostSubmit}>문의하기</PostButton>
      </PostContainer>
    </InnerContainer>
  );
}

export default CreatePostPage;
