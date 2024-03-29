import { Suspense, useState } from "react";
import { PostCard } from "../../../components/cards/post-card/post-card";
import { MainButton } from "../../../components/buttons/main-button/main-button";
import getPosts from "../../../service/api/get-posts";

export default function ProjectsPosts() {
  const data = getPosts.read();
  const [render, setRender] = useState(5);
  const updateRender = () => setRender(render + 5);
  return (
    <>
      <Suspense>
        <section>
          {data.map((post) => {
            if (post.id <= render) {
              return (
                <PostCard key={post.id} title={post.title} text={post.body} />
              );
            }
          })}
        </section>

        {data.at(-1).id === render ? null : (
          <section className="post__section_btn">
            <MainButton text="More Post" theFunction={updateRender} />
          </section>
        )}
      </Suspense>
    </>
  );
}
