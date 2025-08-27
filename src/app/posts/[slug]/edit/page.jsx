"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Hero } from "@/components/Layout";
import Link from "next/link";

const EditPostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
    isPublished: true,
  });

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "無法載入文章");
        }

        // 檢查是否為文章作者
        if (data.author?._id !== session.user.id) {
          setError("您只能編輯自己的文章");
          return;
        }

        setPost(data);
        setFormData({
          title: data.title,
          body: data.body,
          tags: data.tags ? data.tags.join(", ") : "",
          isPublished: data.isPublished,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug, session, status, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      alert("標題和內容為必填欄位");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/posts/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "更新失敗");
      }

      alert("文章更新成功！");
      router.push(`/posts/${params.slug}`);
    } catch (err) {
      alert(`更新失敗：${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">載入中...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          請先登入以編輯文章
        </div>
        <Link href="/api/auth/signin" className="btn btn-primary">
          登入
        </Link>
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

  return (
    <>
      <Hero title="A Blog Theme by Start Bootstrap" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title mb-0">編輯文章</h2>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          標題 <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          minLength={3}
                          placeholder="請輸入文章標題"
                        />
                        <div className="form-text">至少需要 3 個字元</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="body" className="form-label">
                          內容 <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          id="body"
                          name="body"
                          rows={10}
                          value={formData.body}
                          onChange={handleInputChange}
                          required
                          placeholder="請輸入文章內容"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="tags" className="form-label">
                          標籤
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          placeholder="請輸入標籤，多個標籤請用逗號分隔"
                        />
                        <div className="form-text">
                          例如：技術, 程式設計, JavaScript
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="isPublished"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="isPublished"
                          >
                            立即發布
                          </label>
                        </div>
                        <div className="form-text">取消勾選將儲存為草稿</div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Link
                          href={`/posts/${params.slug}`}
                          className="btn btn-secondary"
                        >
                          <i className="fas fa-times me-2"></i>
                          取消
                        </Link>

                        <button
                          type="submit"
                          disabled={saving}
                          className="btn btn-primary"
                        >
                          {saving ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              更新中...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>
                              更新文章
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPostPage;
