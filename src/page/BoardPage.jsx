import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs} from "firebase/firestore";
import styled from "styled-components";
import StyledButton from "../component/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 15px;
  height: 100vh;
  background-color: whitesmoke;
  justify-content: center;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 500px;
`;

const PostItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const PageNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
`;

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const fetchPosts = async () => {
    const postCollection = collection(db, "posts");
    const postSnapshot = await getDocs(postCollection);
    const postList = postSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postList);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id, authorId) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    const currentUser = auth.currentUser;
    if (!currentUser) return;
  
    if (currentUser.uid !== authorId) {  // 작성자 확인
      alert("본인의 게시물만 삭제할 수 있습니다.");
      return;
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <BoardContainer>
      <PostList>
        {currentPosts.map((post) => (
          <PostItem key={post.id}>
            <h3>{post.title}</h3>
            {/* <p>{post.content}</p> */}
            <StyledButton onClick={() => handleDelete(post.id, post.authorId)}>
              Delete
            </StyledButton>
          </PostItem>
        ))}
      </PostList>
      <StyledButton onClick={() => navigate("/board/create")}>
        문의하기
      </StyledButton>
      <PageNavigation>
        {pageNumbers.map(number => (
          <PageButton key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </PageButton>
        ))}
      </PageNavigation>
    </BoardContainer>
  );
}


export default BoardPage;
