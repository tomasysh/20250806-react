import { Hero } from "@/components/Layout";
import { PostPreview } from "./PostPreview";

const POST = [
  {
    title: "Man must explore, and this is exploration at its greatest",
    subTitle: "Problems look mighty small from 150 miles up",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Start Bootstrap",
    date: "September 24, 2023",
    id: 0,
  },
  {
    title:
      "I believe every human has a finite number of heartbeats. I don'd not intend to waste any of mine.",
    subTitle: "",
    author: "Start Bootstrap",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "September 18, 2023",
    id: 1,
  },
  {
    title: "Science has not yet mastered prophecy",
    subTitle:
      "We predict too much for the next year and yet far too little for the next ten.",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Start Bootstrap",
    date: "August 24, 2023",
    id: 2,
  },
  {
    title: "Failure is not an option",
    subTitle:
      "Many say exploration is part of our destiny, but it’s actually our duty to future generations.",
    author: "Start Bootstrap",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "July 8, 2023",
    id: 3,
  },
];

const PostsPage = () => {
  const postPreviews = POST.slice();
  return (
    <>
      <Hero title="A Blog Theme by Start Bootstrap" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {postPreviews.map((postPreview, index) => {
              return (
                <>
                  <PostPreview key={postPreview.id} postPreview={postPreview} />
                  {index !== postPreviews.length - 1 && (
                    <hr className="my-4"></hr>
                  )}
                </>
              );
            })}

            {/* Pager*/}
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href="#!">
                Older Posts →
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer*/}
    </>
  );
};

export default PostsPage;
