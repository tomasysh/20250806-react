export const PostPreview = ({ postPreview }) => {
  return (
    <div className="post-preview">
      <a href="post.html">
        <h2 className="post-title">{postPreview.title}</h2>
        {postPreview.subTitle && (
          <h3 className="post-subtitle">{postPreview.subTitle}</h3>
        )}
      </a>
      <p className="post-meta">
        Posted by
        <a href="#!">{postPreview.author}</a>
        on {postPreview.date}
      </p>
    </div>
  );
};
