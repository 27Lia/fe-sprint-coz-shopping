import React, { useCallback, useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StyledButton from "../component/Button";
import InnerContainer from "./InnerContainer";

const PostDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  height: 70vh;
  width: 100%;
  margin-top: 150px;
`;

const StyledInput = styled.textarea`
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  width: 100%;
  font-size: 18px;
  height: 40vh;
`;

const TitleInput = styled(StyledInput)`
  height: 10vh;
`;

const PostTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #343a40;
  max-height: 5vh;
  overflow-y: auto;
  max-width: 80%;
`;

const PostContent = styled.p`
  max-width: 80%;
  max-height: 40vh;
  overflow: auto;
  font-size: 20px;
  color: #495057;
  line-height: 1.5;
`;

// 이전의 StyledButton 디자인과 충돌이 있을 수 있으므로 여기에 새로운 스타일 추가
const PostButton = styled(StyledButton)`
  margin: 0 10px;
`;

function PostDetailPage() {
  const { postId } = useParams(); // URL에서 게시글 ID 가져오기
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const fetchPost = useCallback(async () => {
    try {
      const postDoc = await getDoc(doc(db, "posts", postId));
      if (postDoc.exists()) {
        setPost({ id: postDoc.id, ...postDoc.data() });
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [postId, fetchPost]);

  const handleEdit = () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    if (currentUser.uid !== post.authorId) {
      alert("본인의 게시물만 수정할 수 있습니다.");
      return;
    }

    setEditedTitle(post.title);
    setEditedContent(post.content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        title: editedTitle || post.title,
        content: editedContent || post.content,
      });
      setIsEditing(false);
      fetchPost();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    if (currentUser.uid !== post.authorId) {
      alert("본인의 게시물만 삭제할 수 있습니다.");
      return;
    }

    try {
      await deleteDoc(doc(db, "posts", postId));
      navigate("/board"); // 삭제 후 게시판 페이지로 이동
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  if (!post) return null; // 게시글 데이터가 아직 없는 경우

  return (
    <InnerContainer>
      <PostDetailContainer>
        {isEditing ? (
          <>
            <TitleInput
              type="text"
              value={editedTitle}
              placeholder={post.title}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <StyledInput
              type="text"
              value={editedContent}
              placeholder={post.content}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <PostButton onClick={handleSave}>저장</PostButton>
          </>
        ) : (
          <>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            <div>
              <PostButton onClick={handleEdit}>수정</PostButton>
              <PostButton onClick={handleDelete}>삭제</PostButton>
            </div>
          </>
        )}
      </PostDetailContainer>
    </InnerContainer>
  );
}

export default PostDetailPage;
