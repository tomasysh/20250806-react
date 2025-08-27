"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Hero } from "@/components/layout";
import Link from "next/link";

const PostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.slug}`); // params.slug 實際上是文章 ID
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "無法載入文章");
        }

        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const handleDelete = async () => {
    if (!confirm("確定要刪除這篇文章嗎？此動作無法復原。")) {
      return;
    }

    setDeleteLoading(true);

    try {
      const response = await fetch(`/api/posts/${params.slug}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "刪除失敗");
      }

      alert("文章已成功刪除");
      router.push("/posts");
    } catch (err) {
      alert(`刪除失敗：${err.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Hero title="A Blog Theme by Start Bootstrap" img="home-bg" />
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7"></div>
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">載入中...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          錯誤：{error}
        </div>
        <Link href="/posts" className="btn btn-primary">
          返回文章列表
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          找不到該文章
        </div>
        <Link href="/posts" className="btn btn-primary">
          返回文章列表
        </Link>
      </div>
    );
  }

  const isAuthor = session?.user?.id === post.author?._id;

  return (
    <>
      <Hero title="A Blog Theme by Start Bootstrap" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{post.title}</h1>

                <div className="text-muted fst-italic mb-2">
                  發表於 {new Date(post.createdAt).toLocaleDateString("zh-TW")}
                  {post.author && (
                    <span> 由 {post.author.name || post.author.email}</span>
                  )}
                  {post.updatedAt !== post.createdAt && (
                    <span>
                      {" "}
                      (最後更新：
                      {new Date(post.updatedAt).toLocaleDateString("zh-TW")})
                    </span>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mb-3">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="badge bg-secondary me-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {!post.isPublished && (
                  <div className="alert alert-warning" role="alert">
                    <i className="fas fa-eye-slash me-2"></i>
                    此文章尚未發布
                  </div>
                )}
              </header>

              <section className="mb-5">
                <div style={{ whiteSpace: "pre-line" }}>{post.body}</div>
              </section>

              <footer className="border-top pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="/posts" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left me-2"></i>
                    返回文章列表
                  </Link>

                  {isAuthor && (
                    <div>
                      <Link
                        href={`/posts/${params.slug}/edit`}
                        className="btn btn-warning me-2"
                      >
                        <i className="fas fa-edit me-2"></i>
                        編輯
                      </Link>
                      <button
                        onClick={handleDelete}
                        disabled={deleteLoading}
                        className="btn btn-danger"
                      >
                        {deleteLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            刪除中...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-trash me-2"></i>
                            刪除
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
