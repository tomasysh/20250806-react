import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

// 匯出認證選項物件
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google 用戶端 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google 用戶端密鑰
      authorization: {
        params: {
          prompt: "consent", // 強制要求用戶同意
          access_type: "offline", // 取得離線權限
          response_type: "code", // 回傳授權碼
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // NextAuth 密鑰
  callbacks: {
    // 使用者成功登入時呼叫
    async signIn({ profile }) {
      // 1. 連接資料庫
      await connectDB();
      // 2. 檢查使用者是否已存在
      const userExists = await User.findOne({ email: profile.email });
      // 3. 若不存在則建立新使用者
      if (!userExists) {
        // 若名稱過長則截斷
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }
      // 4. 回傳 true 允許登入
      return true;
    },
    // 修改 session 物件的 callback 函式
    async session({ session }) {
      // 1. 從資料庫取得使用者
      const user = await User.findOne({ email: session.user.email });
      // 2. 將使用者 id 指派到 session
      session.user.id = user._id.toString();
      // 3. 回傳 session
      return session;
    },
  },
};
