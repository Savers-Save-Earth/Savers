import supabase from '@/libs/supabase'
import React from 'react'

const MyComments = async ({ params }: { params: { id: string } }) => {
  let { data: mycomments, error } = await supabase.from('community_comment').select().match({"writer_uid": params.id}).range(0, 1)
  if (error) throw error

  return (
    <>
        {
      mycomments?.map((comment) => (
        <div className="border-solid border-2 border-blue-900 p-5 m-5" key={comment.post_uid}>
        <p>댓글 uid : {comment.comment_uid}</p>
        <p>댓글 : {comment.content}</p>
        <p>댓글단 글 uid : {comment.post_uid}</p>
        <p>등록일: {comment.created_date.slice(0,10)}</p>
        </div>
      ))
    }
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    </>
    
  )
}

export default MyComments