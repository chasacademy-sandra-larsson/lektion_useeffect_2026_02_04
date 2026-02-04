import { useState, useEffect} from "react"

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
      async function getPosts() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
            if(!response.ok) {
                throw new Error("Något gick fel");
            }
            const data = await response.json();
            setPosts(data);

        } catch(error) {

        }
      }
      getPosts();
    }, []);



    return (
        <section>
                <h2>Posts</h2>
                {posts.map((post) => (
                    <li>{post.title}</li>
                ))}
        </section>
    )

}