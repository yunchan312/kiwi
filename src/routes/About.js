import Logo from "../assets/kiwi.png";

export default function About() {
  return (
    <div className="py-3 overflow-y-hidden flex flex-col justify-around h-[90vh]">
      <div className="w-[500px] ">
        <div className="text-2xl font-bold">About Kiwi</div>
        <p>
          저는 그냥 트위터 그대로 따라하는 것은 재미가 없다고 생각했습니다.
          그래서 저만의 디자인과 아이디어를 넣고 싶었습니다. 그때 마침 제 눈에
          들어오는 키위 광고! 그래서 Kiwi라는 이름의 새로운 sns를 만들어보고자
          합니다. 이렇게 우연하고도 충동적으로 ‘그냥 키위 이모지가 귀여워서’
          만든거지만, 키위는 과일 뿐만 아니라 새의 이름이기도 하다는 생각이
          들었습니다! 그래서 짧은 글만 남길 수 있는 kiwi와 길고 자세한 글을 남길
          수 있는 blog로 post의 형태를 두개로 나누어 저의 kiwi에게도 두가지의
          뜻을 주었답니다! 그리고 키위는 ‘텍스트’에 집중하는 새로운 형태의
          소셜미디어입니다. 페이스북이나 인스타그램처럼 현존하는 소셜미디어들은
          ‘사진’이나 ‘비디오’에 집중합니다. 하지만 저는 글만이 갖고있는 새로운
          매력이 있다고 생각합니다. 따라서 숏 폼 비디오나 한번에 많은 정보를
          주는 기존의 sns를 fast sns라고 한다면, 저는 사용자가 천천히 글을
          읽으면서 생각하도록 하는 slow sns를 만들고 싶었습니다. 그 목표를
          이루기 위해, 가독성을 높여야 한다고 생각했고, 그 방법으로 마크다운
          문법을 생각했습니다. 마크다운의 형태를 갖는 블로그나 Kiwi를 포스트 할
          수 있다면 정말로 글의 매력을 전달해주는 slow sns가 되지 않을까요!?!?
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-bold">Logo</div>
          <img src={Logo} alt="logo" />
        </div>
        <div className="w-[150px]">
          <div className="text-2xl font-bold">Color</div>
          <div>
            <ol>
              <li className="flex justify-between items-center">
                <div className="w-3 h-3 bg-[#00d26a]"></div>
                <div className="w-[120px]">kiwi - #00d26a</div>
              </li>
              <li className="flex justify-between items-center">
                <div className="w-3 h-3 bg-[#e2ff92]"></div>
                <div className="w-[120px]">kiwicenter - #e2ff92</div>
              </li>
              <li className="flex justify-between items-center">
                <div className="w-3 h-3 bg-[#1c171a]"></div>
                <div className="w-[120px]">kiwiseed - #1c171a</div>
              </li>
              <li className="flex justify-between items-center">
                <div className="w-3 h-3 bg-[#6d4534]"></div>
                <div className="w-[120px]">kiwiskin - #6d4534</div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold">Function</div>
        <ol>
          <li>사용자가 마크다운 형식으로 작성할 수 있는 기능</li>
          <li>개인 블로그 작성 가능</li>
          <li>인기 글들을 확인 할 수 있는 기능</li>
        </ol>
      </div>
    </div>
  );
}
