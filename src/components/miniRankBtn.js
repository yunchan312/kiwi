import like from "../assets/solidHeart.svg";

export default function MiniRankBtn({ username, kiwi, likeNum }) {
  return (
    <div className="flex items-center bg-white my-1 py-1 px-3 justify-between rounded-lg">
      <div>
        <div>{username}</div>
        <div className="w-[200px] text-ellipsis overflow-hidden">{kiwi}</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img alt="likeBtn" src={like} />
        <div>{likeNum}</div>
      </div>
    </div>
  );
}
