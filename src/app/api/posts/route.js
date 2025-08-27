import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Post from "@/models/Post";
import { getSessionUserId } from "@/utils/getSessionUser";

export const GET = async (request) => {
  try {
    await connectDB();
    // 解析 tag 參數
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    let query = {};
    if (tag && tag !== "all") {
      query = { tags: tag };
    }
    const posts = await Post.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};

// 處理新增文章的 POST 請求
export const POST = async (request) => {
  try {
    // 檢查使用者是否已登入
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "必須登入才能新增文章" },
        { status: 401 }
      );
    }

    // 連接資料庫
    await connectDB();

    // 解析請求內容
    const { title, body, tags, isPublished = true } = await request.json();

    // 驗證必填欄位
    if (!title || !body) {
      return NextResponse.json(
        { error: "標題和內容為必填欄位" },
        { status: 400 }
      );
    }

    // 驗證標題長度
    if (title.length < 3) {
      return NextResponse.json(
        { error: "標題至少需要 3 個字元" },
        { status: 400 }
      );
    }

    // 處理標籤格式（如果是字串則轉為陣列）
    let tagsArray = [];
    if (tags) {
      if (typeof tags === "string") {
        // 如果是字串，以逗號分隔並清理空白
        tagsArray = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      } else if (Array.isArray(tags)) {
        tagsArray = tags.filter((tag) => tag && tag.trim().length > 0);
      }
    }

    // 建立新文章
    const newPost = new Post({
      title: title.trim(),
      body: body.trim(),
      author: userId,
      tags: tagsArray,
      isPublished: Boolean(isPublished),
    });

    // 儲存到資料庫
    const savedPost = await newPost.save();

    return NextResponse.json(
      {
        message: "文章新增成功",
        post: {
          id: savedPost._id,
          title: savedPost.title,
          body: savedPost.body,
          tags: savedPost.tags,
          isPublished: savedPost.isPublished,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("新增文章錯誤:", error);
    return NextResponse.json(
      { error: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
};
