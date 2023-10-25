import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../component/Button";
import { useSelector } from "react-redux";

const CreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 15px;
  height: 100vh;
  justify-content: center;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  font-size: 20px;
`;

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    await addDoc(collection(db, "posts"), {
      title,
      content,
      authorId: currentUser.uid,
    });
    navigate("/board");
  };

  return (
    <CreatePostContainer>
      <PostForm onSubmit={handlePostSubmit}>
        <StyledInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <StyledButton type="submit">문의하기</StyledButton>
      </PostForm>
    </CreatePostContainer>
  );
}

export default CreatePostPage;
