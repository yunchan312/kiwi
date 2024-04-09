import { useEffect, useState } from "react";
import { auth, database, storage } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Kiwi from "../components/kiwi";
import KiwiBird from "../assets/bird.svg";
import WhiteBox from "../components/whiteBox";

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [kiwis, setKiwis] = useState([]);
  const [blogNum, setBlogNum] = useState(0);
  const [kiwiNum, setKiwiNum] = useState(0);
  const fetchKiwis = async () => {
    const kiwiQuery = query(
      collection(database, "kiwi"),
      where("userId", "==", user?.uid)
    );
    const snapshot = await getDocs(kiwiQuery);
    const kiwis = snapshot.docs.map((doc) => {
      const {
        kiwi,
        createdAt,
        userId,
        username,
        photo,
        userEmail,
        whoCreated,
        likedBy,
        likeNum,
      } = doc.data();
      return {
        kiwi,
        createdAt,
        userId,
        username,
        photo,
        userEmail,
        id: doc.id,
        whoCreated,
        likedBy,
        likeNum,
      };
    });
    setKiwis(kiwis);
  };

  const onAvatarChange = async (e) => {
    if (!user) return;
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatar/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        avatarUrl: avatarUrl,
      });
    }
  };
  const getAvatar = async () => {
    try {
      const locationRef = ref(storage, `avatar/${user?.uid}`);
      const avatarUrl = await getDownloadURL(locationRef);
      setAvatar(avatarUrl);
    } catch (e) {
      console.log(e);
    }
  };
  const getUserInform = async () => {
    const document = await getDocs(collection(database, "user"));
    const result = document.docs.map((doc) => {
      const { kiwi, blog } = doc.data();
      return { kiwi, blog, id: doc.id };
    });
    result.map((d) => {
      if (d.id === user.uid) {
        setKiwiNum(d.kiwi.length);
        setBlogNum(d.blog.length);
      }
      return null;
    });
  };
  useEffect(() => {
    fetchKiwis();
    getAvatar();
    getUserInform();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="py-7 flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="avatar">
          {avatar ? (
            <img
              src={avatar}
              className="rounded-full border-2 w-[90px] h-[90px] border-kiwiPeel cursor-pointer hover:shadow-xl hover:scale-[1.1]"
              alt="avatar"
            />
          ) : (
            <div className="border-2 w-[90px] h-[90px] rounded-full bg-avatarDefault bg-cover bg-center border-kiwiPeel cursor-pointer hover:shadow-xl hover:scale-[1.1]" />
          )}
        </label>
        <input
          onChange={onAvatarChange}
          type="file"
          id="avatar"
          className="hidden"
        />
        <div className="w-full flex">
          <div className="w-full text-center flex justify-center items-center">
            <div className="self-center min-w-[30%] text-2xl mt-5 hover:bg-gray-200 cursor-pointer rounded-xl">
              {user.displayName}
            </div>
          </div>
        </div>
        <div className="text-gray-400">{user.email}</div>
      </div>

      <div>
        <div className="text-2xl">내 정보</div>
        <div className="flex justify-center items-center gap-3">
          <WhiteBox boxTitle="내 키위" kiwis={kiwis} num={kiwiNum} />
          <WhiteBox boxTitle="내 블로그" kiwis={kiwis} num={blogNum} />
          <WhiteBox boxTitle="내 좋아요" kiwis={kiwis} />
        </div>
      </div>

      <div>
        <div className="text-2xl">내가 업로드한 키위</div>
        <div className="overflow-y-scroll h-[400px] flex flex-col gap-2 no-scrollbar">
          {kiwis ? (
            kiwis.map((kiwi) => <Kiwi key={kiwi.id} {...kiwi} />)
          ) : (
            <div className="flex h-full flex-col justify-center items-center">
              <img src={KiwiBird} alt="kiwibird" className="w-[300px]" />
              <div>키위가 없어요ㅜㅜ</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
