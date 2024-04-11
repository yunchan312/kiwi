import like from "../assets/solidHeart.svg";

export default function MiniRankBlog({ title, likeNum }) {
  return (
    <div className="flex items-center bg-white my-1 py-1 px-3 justify-between rounded-lg">
      <div className="font-bold">{title}</div>

      <div className="flex flex-col justify-center items-center">
        <img alt="heart" src={like} />
        <div>{likeNum}</div>
      </div>
    </div>
  );
}
