const BlogForm = ({addBlog, setAuthor, setTitle, setUrl} ) => {
    return (
        <>
       <form onSubmit={addBlog}>
        <div>
          title: <input type="text" name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input type="text" name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
        </>
    )
}

export default BlogForm