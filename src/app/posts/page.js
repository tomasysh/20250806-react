"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { Hero } from "@/components/Layout";
import PostsList from "./PostsList";

export default function PostsPage() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <Hero title="文章列表" img="home-bg" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <PostsList />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
