import Bird from "../assets/bird.svg";
import { auth } from "../firebase";
import WhiteBox from "../components/whiteBox";
import PostPreview from "../components/postPreview";

export default function BlogMain() {
  const user = auth.currentUser;
  return (
    <div className="py-5 flex flex-col justify-center items-center gap-3">
      <div>
        <img className="w-[250px]" alt="bird" src={Bird} />
        <div className="text-center text-2xl">{user.displayName}의 블로그</div>
      </div>
      <div className="w-[100%]">
        <div className="text-2xl mb-2">내 상태</div>
        <div className="flex gap-5 justify-center items-center">
          <WhiteBox boxTitle="블로그 포스트" num={20} />
          <WhiteBox boxTitle="블로그 좋아요" num={20} />
          <div className="whiteBox cursor-pointer hover:bg-black hover:bg-opacity-20">
            <div className="boxtitle">글쓰러 가기</div>
            <div className="boxNumber">
              <span>Click</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-2xl mb-2">내 포스트</div>
        <PostPreview />
      </div>
    </div>
  );
}
