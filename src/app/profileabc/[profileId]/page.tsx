import React from 'react'
import Profile from '@/components/profile/Profile'

  // const MyProfile = ( props: any ) => {
const MyProfile = ({ params }: { params: { profileId: string } }) => {
  return (
    <>
    <div>MyPage</div>
    <div>Props: {params.profileId}</div>
    <Profile profileId={params.profileId}/>
    </>
  )
}

export default MyProfile