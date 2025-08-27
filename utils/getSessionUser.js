import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

// 取得目前登入使用者的資訊
export const getSessionUser = async () => {
  // 從伺服器取得 session 物件
  const session = await getServerSession(authOptions);

  // 若沒有 session 或沒有 user，回傳 null
  if (!session || !session.user) {
    return null;
  }

  // 回傳 session 內的使用者物件
  return session.user;
};

// 取得目前登入使用者的 id
export const getSessionUserId = async () => {
  // 從伺服器取得 session 物件
  const session = await getServerSession(authOptions);

  // 若沒有 session 或沒有 user，回傳 null
  if (!session || !session.user) {
    return null;
  }

  // 回傳 session 內的使用者 id
  return session.user.id;
};
