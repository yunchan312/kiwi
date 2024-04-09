import { useEffect, useState } from "react";

export default function WhiteBox({ boxTitle, kiwis, num }) {
  const [totalLikes, setTotalLikes] = useState(0);
  const getTotalLikes = () => {
    if (!kiwis) return;
    kiwis.map((kiwi) => {
      if (!kiwi.likeNum) return null;
      setTotalLikes((prev) => (prev = prev + parseInt(kiwi.likeNum)));
      return null;
    });
  };
  useEffect(() => {
    getTotalLikes();
    // eslint-disable-next-line
  }, [kiwis]);
  return (
    <div className="whiteBox select-none">
      <div className="boxtitle">{boxTitle}</div>
      <div className="boxNumber">
        <span>{num ?? totalLikes}</span>
      </div>
    </div>
  );
}
