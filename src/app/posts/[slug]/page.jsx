import { Hero } from "@/components/Layout";

const PostPage = async ({ params }) => {
  const resolvedParams = await params;

  return (
    <>
      <Hero title="A Blog Theme by Start Bootstrap" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <h1>當前所在的文章是 {resolvedParams.slug}</h1>
          </div>
        </div>
      </div>
      {/* Footer*/}
    </>
  );
};

export default PostPage;
