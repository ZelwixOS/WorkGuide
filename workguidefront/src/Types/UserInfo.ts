type UserInfo = {
  id: string;
  userName: string;
  firstName: string;
  secondName: string;
  role: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  banned: boolean;
  position: string;
  positionId: string;
  mentorId: string | null
};

export default UserInfo;