"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/Layout";

const CreatePostPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
    isPublished: true,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // 檢查登入狀態
  useEffect(() => {
    if (status === "loading") return; // 還在載入中
    if (!session) {
      router.push("/"); // 未登入則重新導向到首頁
    }
  }, [session, status, router]);

  // 如果還在載入或未登入，顯示載入狀態
  if (status === "loading") {
    return (
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="text-center mt-5">
              <p>載入中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // 避免閃爍
  }

  // 處理表單輸入變更
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // 清除對應的錯誤訊息
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 驗證表單
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "標題為必填欄位";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "標題至少需要 3 個字元";
    }

    if (!formData.body.trim()) {
      newErrors.body = "內容為必填欄位";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          body: formData.body.trim(),
          tags: formData.tags.trim(),
          isPublished: formData.isPublished,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("文章新增成功！即將跳轉到文章頁面...");
        // 成功後重新導向到新建立的文章
        setTimeout(() => {
          router.push(`/posts/${data.post.id}`);
        }, 2000);
      } else {
        setMessage(data.error || "新增文章失敗，請稍後再試");
      }
    } catch (error) {
      console.error("提交錯誤:", error);
      setMessage("網路錯誤，請檢查連線後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mb-4">
      <Hero title="向世界發表你的想法吧！" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="page-heading">
              <h1>新增文章</h1>
              <span className="subheading">分享你的想法與知識</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {message && (
              <div
                className={`alert ${
                  message.includes("成功") ? "alert-success" : "alert-danger"
                } mb-4`}
                role="alert"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="請輸入文章標題"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label htmlFor="title">文章標題 *</label>
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              <div className="form-floating mb-3">
                <textarea
                  className={`form-control ${errors.body ? "is-invalid" : ""}`}
                  id="body"
                  name="body"
                  placeholder="請輸入文章內容"
                  style={{ height: "12rem" }}
                  value={formData.body}
                  onChange={handleChange}
                  disabled={loading}
                ></textarea>
                <label htmlFor="body">文章內容 *</label>
                {errors.body && (
                  <div className="invalid-feedback">{errors.body}</div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="請輸入標籤，以逗號分隔"
                  value={formData.tags}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label htmlFor="tags">標籤 (可選，以逗號分隔)</label>
                <div className="form-text">例如：JavaScript, 前端, 教學</div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="isPublished">
                  立即發布
                </label>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "新增中..." : "新增文章"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatePostPage;
