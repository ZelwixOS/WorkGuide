type UserMainInfo = {
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
  mentorId: string | null;
};

export default UserMainInfo;
