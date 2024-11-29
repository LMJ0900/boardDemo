


import PostForm from "@/components/postForm";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation"; 


export default function NewPostPage() {

  async function createPost(prevState, formData) {
    "use server";
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = []
    
    if(!title || title.trim().length ===0){
      errors.push("제목이 없습니다")
    }
    if(!image || image.size===0){
      errors.push('이미지가 없습니다')
    }
    if(!content || content.trim().length ===0){
      errors.push("내용이 없습니다")
    }

    if(errors.length>0){
      return {errors}
    }


    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect('/feed')
  }
 
  return <PostForm action={createPost}></PostForm>
}
