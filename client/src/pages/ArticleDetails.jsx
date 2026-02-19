import { useParams } from "react-router-dom";
import { useEffect,useRef } from "react";
function ArticleDetails({articles,likeArticle,viewArticle}){
    const id = useParams().id;
    const article = articles.find(
        (item) => item.id === Number(id)
    );
    const hasViewed = useRef(false);
    useEffect(()=>{
        if(id && !hasViewed.current){
            viewArticle(Number(id));
            hasViewed.current = true;
        }},[id]);
    if(!article){
        return <h1>Article not found</h1>
    } 

    return(
        <div>
            <h1>{article.title}</h1>
            <p><strong>Likes:</strong> {article.likes}</p>
            <button onClick={() => likeArticle(article.id)}>
            👍 Like
            </button>
            <p><strong>Category:</strong>{article.category}</p>
            <p><strong>Likes:</strong>{article.likes}</p>
            <p><strong>Views:</strong>{article.views}</p>
            <p><strong>Created At:</strong>{article.createdAt}</p>

            <h2>Tags</h2>
            <ul>
                {article.tags.map((tag,index)=>(
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </div>
    )
}
export default ArticleDetails;