import React from 'react'

const MyMission = ({ params }: { params: { id: string } }) => {
  return (
    <>
    <div>MyMission</div>
    <h1>파람스 {params.id}</h1>
    </>
  )
}

export default MyMission