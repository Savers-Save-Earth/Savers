import React from 'react'
import supabase from '@/libs/supabase'

const MyPosts = async ({ params }: { params: { id: string } }) => {
  let { data: myposts, error } = await supabase.from('community').select().match({"author_uid": params.id})
  // .range(0, 1)
  if (error) throw error
  return (
    <>
    {
      myposts?.map((post) => (
        <div className="border-solid border-2 border-blue-900 p-5 m-5" key={post.post_uid}>
        <p>글 uid : {post.post_uid}</p>
        <p>글 제목 : {post.title}</p>
        <p>등록일: {post.updated_date.slice(0,10)}</p>
        </div>
      ))
    }
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    <div>MyPosts</div>
    </>
    
  )
}

export default MyPosts