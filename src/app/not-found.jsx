import { Hero } from "@/components/Layout";

const NotFoundPage = () => {
  return (
    <>
      <Hero title="A Blog Theme by Start Bootstrap" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <div
              style={{
                margin: "100px auto",
              }}
            >
              <h1>404 - 找不到頁面</h1>
              <p>尋尋覓覓冷冷清清淒淒慘慘戚戚</p>
              <p style={{ fontStyle: "italic", color: "#888" }}>
                —— 宋代 李清照
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
