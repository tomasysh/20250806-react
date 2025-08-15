import Link from "next/link";

export const PostPreview = ({ postPreview }) => {
  return (
    <div className="post-preview">
      <Link href={`/posts/${postPreview.id}`}>
        <h2 className="post-title">{postPreview.title}</h2>
        {postPreview.subTitle && (
          <h3 className="post-subtitle">{postPreview.subTitle}</h3>
        )}
      </Link>
      <p className="post-meta">
        發佈者
        <a href="#!">{postPreview.author}</a>於 {postPreview.date}
      </p>
    </div>
  );
};
