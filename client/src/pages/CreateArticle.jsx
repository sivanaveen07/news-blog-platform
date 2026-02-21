import {useState} from 'react';;
import { useNavigate } from 'react-router-dom';
function CreateArticle({addArticle}){
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [tags,setTags] = useState("");
    const [content,setContent] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        const newArticle = {
            id:Date.now(), // Unique ID based on timestamp
            title,
            category,
            tags : tags.split(",").map(tag=>tag.trim()),// Convert comma-separated string to array
            content,
            likes:0,
            views:0,
            createdAt: new Date().toISOString().split
        };
        addArticle(newArticle);
        navigate('/');
    }
    return(
        <div>
            <h1>Create Article</h1>
            <form onSubmit={handleSubmit}> 
                <input 
                       type="text"
                       placeholder="Title"
                       value={title}
                       onChange={(e)=>setTitle(e.target.value)}
                       required
                />
                <br />
                <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    required
                >
                      <option value="">Select Category</option>
                      <option value="Technology">Technology</option>
                      <option value="Education">Education</option>
                      <option value="Sports">Sports</option>
                </select>
                <br />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e)=>setTags(e.target.value)} 
                />
                <br />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    rows="5"
                    required
                />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )
} 
export default CreateArticle;