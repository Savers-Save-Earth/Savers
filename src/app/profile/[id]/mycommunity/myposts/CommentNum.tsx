import supabase from '@/libs/supabase';
import React, { useEffect, useState } from 'react'

export default function CommentNum({postId}: any) {
	const [commentsNum, setCommentsNum] = useState(0);
	useEffect(() => {
		const getCommentsNum = async (postUid: string) => {
			const { count } = await supabase
				.from("community_comment")
				.select("*", { count: "exact" })
				.eq("post_uid", postUid);
			setCommentsNum(count || 0);
			return count;
		};
		
		getCommentsNum(postId);
	}, []);
	return (
		<span>{commentsNum}</span> 
	)
}
