import { useState, useEffect} from "react"

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      async function getPosts() {
        try {
            setLoading(true);
            
            setError(null);
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
            if(!response.ok) {
                throw new Error("Något gick fel");
            }
            const data = await response.json();
            setPosts(data);

        } catch(error) {
            setError("Fel: Kunde inte hämta inlägg");
        } finally {
            setLoading(false);
        }
      }
      getPosts();
    }, []);

    // useEffect(() => {

    //     // Den deklarade funktionen getPost

    //     // Funktion som ska köras vid mount eller när en dependencie i arrayen ändras
    //     //getPosts()

    // }, [])


    return (
        <section>
                <h2>Posts</h2>

                {loading && <p className="text-gray-500">Laddar...</p>}
                {error && <p className="text-red-500"> Error ... </p>}

                <ul>
                    {!loading && !error &&posts.map((post) => (
                        <li>{post.title}</li>
                    ))}
                </ul>
        </section>
    )

}