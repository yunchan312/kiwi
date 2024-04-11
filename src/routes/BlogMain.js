import Bird from "../assets/bird.svg";
import { auth, database } from "../firebase";
import WhiteBox from "../components/whiteBox";
import PostPreview from "../components/postPreview";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { query } from "firebase/database";

export default function BlogMain() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const fetchBlog = async () => {
    const blogQuery = query(
      collection(database, "blog"),
      where("whoCreated", "==", user?.uid)
    );
    const snapshot = await getDocs(blogQuery);
    const blogs = snapshot.docs.map((doc) => {
      const { text, title, postTime, whoCreated, likedBy, likeNum, photo } =
        doc.data();
      return {
        text,
        title,
        postTime,
        whoCreated,
        id: doc.id,
        likedBy,
        likeNum,
        photo,
      };
    });
    setBlogs(blogs);
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="py-5 flex flex-col justify-center items-center gap-3">
      <div>
        <img className="w-[250px]" alt="bird" src={Bird} />
        <div className="text-center text-2xl">{user.displayName}의 블로그</div>
      </div>
      <div className="w-[100%]">
        <div className="text-2xl mb-2">내 상태</div>
        <div className="flex gap-5 justify-center items-center">
          <WhiteBox boxTitle="블로그 포스트" num={blogs.length} />
          <WhiteBox boxTitle="블로그 좋아요" kiwis={blogs} />
          <div
            onClick={() => navigate("/writeblog")}
            className="whiteBox cursor-pointer hover:bg-black hover:bg-opacity-20"
          >
            <div className="boxtitle">글쓰러 가기</div>
            <div className="boxNumber">
              <span>Click</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-2xl mb-2">내 포스트</div>
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <PostPreview key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
