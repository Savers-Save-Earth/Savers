import Link from "next/link"
import { Router } from "next/router"

export default function ProfiletestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <h1>프로필테스트 레이아웃</h1>
    <Link href={"/profiletest/bd2125b8-d852-485c-baf3-9c7a8949beee/myprofile"}>나의 프로필</Link>
    <Link href={"/profiletest/bd2125b8-d852-485c-baf3-9c7a8949beee/mymission"}>나의 미션</Link>
    <Link href={"/profiletest/bd2125b8-d852-485c-baf3-9c7a8949beee/mycommunity"}>커뮤니티 활동</Link>
    <section>{children}</section>
    </>
  )

}