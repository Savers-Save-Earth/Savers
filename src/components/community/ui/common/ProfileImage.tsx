import { useEffect, useState } from 'react';
import { getProfileImg } from '@/api/community/post';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProfileImageProps {
  userUid?: string;
}

const ProfileImage = ({ userUid }: ProfileImageProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/profileImage/default_profile_image.svg`
  );
  const router = useRouter()

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (userUid) {
        const res = await getProfileImg(userUid);
        if (res[0]?.profileImage) {
          setProfileImageUrl(res[0].profileImage);
        }
      }
    };

    fetchProfileImage();
  }, [userUid]);

  return (
    <div
      className="relative object-contain w-12 h-12 rounded-full cursor-pointer"
      onClick={() => router.push(`/profile/${userUid}/myprofile`)}
    >
      <Image
        src={profileImageUrl}
        alt="Profile image of the author"
        fill={true}
        className="rounded-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default ProfileImage;
