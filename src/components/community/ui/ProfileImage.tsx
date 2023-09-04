import { useEffect, useState } from 'react';
import { getProfileImg } from '@/api/community/post';

interface ProfileImageProps {
  userUid?: string;
}

const ProfileImage = ({ userUid }: ProfileImageProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/profileImage/default_profile_image.svg`
  );

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
    <img
      src={profileImageUrl}
      alt="profile"
      className="w-12 h-12 rounded-full"
    />
  );
};

export default ProfileImage;
