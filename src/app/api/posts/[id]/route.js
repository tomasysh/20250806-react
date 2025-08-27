import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Post from "@/models/Post";
import User from "@/models/User";
import { getSessionUserId } from "@/utils/getSessionUser";

// 取得單篇文章
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    // 查詢文章並填入作者資訊
    const post = await Post.findById(id).populate("author", "name email");

    if (!post) {
      return NextResponse.json({ error: "找不到該文章" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("取得文章錯誤:", error);
    return NextResponse.json(
      { error: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
};

// 更新文章
export const PUT = async (request, { params }) => {
  try {
    // 檢查使用者是否已登入
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "必須登入才能編輯文章" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;
    const { title, body, tags, isPublished } = await request.json();

    // 查詢文章
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "找不到該文章" }, { status: 404 });
    }

    // 檢查是否為文章作者
    if (post.author.toString() !== userId) {
      return NextResponse.json(
        { error: "您只能編輯自己的文章" },
        { status: 403 }
      );
    }

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

    // 處理標籤格式
    let tagsArray = [];
    if (tags) {
      if (typeof tags === "string") {
        tagsArray = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      } else if (Array.isArray(tags)) {
        tagsArray = tags.filter((tag) => tag && tag.trim().length > 0);
      }
    }

    // 更新文章
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        body: body.trim(),
        tags: tagsArray,
        isPublished: Boolean(isPublished),
      },
      { new: true }
    ).populate("author", "name email");

    return NextResponse.json({
      message: "文章更新成功",
      post: updatedPost,
    });
  } catch (error) {
    console.error("更新文章錯誤:", error);
    return NextResponse.json(
      { error: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
};

// 刪除文章
export const DELETE = async (request, { params }) => {
  try {
    // 檢查使用者是否已登入
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "必須登入才能刪除文章" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;

    // 查詢文章
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "找不到該文章" }, { status: 404 });
    }

    // 檢查是否為文章作者
    if (post.author.toString() !== userId) {
      return NextResponse.json(
        { error: "您只能刪除自己的文章" },
        { status: 403 }
      );
    }

    // 刪除文章
    await Post.findByIdAndDelete(id);

    return NextResponse.json({
      message: "文章刪除成功",
    });
  } catch (error) {
    console.error("刪除文章錯誤:", error);
    return NextResponse.json(
      { error: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
};
