import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // query와 orderBy 임포트
import styled from "styled-components";
import StyledButton from "../component/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InnerContainer from "./InnerContainer";

const BoardContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  min-width: 350px;
`;

const PostList = styled.ul`
  padding: 0;
  margin: 0 auto;
  max-width: 800px;
`;

const PostItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 350px;

  h3 {
    max-height: 3vh;
    overflow: auto;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const PageNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 60px;
  min-width: 350px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  background-color: #008cba;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f5f;
  }
`;

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  max-width: 800px;
  margin: 0 auto;
  min-width: 350px;
`;

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const fetchPosts = async () => {
    const postCollection = collection(db, "posts");
    const q = query(postCollection, orderBy("createdAt", "desc"));
    const postSnapshot = await getDocs(q);
    const postList = postSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postList);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePostClick = (postId) => {
    navigate(`/board/${postId}`); // 게시글 ID를 사용하여 게시글 세부 정보 페이지로 이동
  };

  const handleCreatePostClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요."); // 로그인하지 않은 경우 알림 표시
      navigate("/login");
      return;
    }
    navigate("/board/create"); // 로그인한 경우 문의 작성 페이지로 이동
  };

  return (
    <InnerContainer>
      <BoardContainer>
        <Title>문의 게시판</Title>
        <PostList>
          {currentPosts.map((post) => (
            <PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
              <h3>{post.title}</h3>
            </PostItem>
          ))}
        </PostList>
        <div className="btn-box">
          <CreateButtonContainer>
            <StyledButton onClick={handleCreatePostClick}>
              문의하기
            </StyledButton>
          </CreateButtonContainer>
        </div>
        <PageNavigation>
          {pageNumbers.map((number) => (
            <PageButton key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </PageButton>
          ))}
        </PageNavigation>
      </BoardContainer>
    </InnerContainer>
  );
}

export default BoardPage;
