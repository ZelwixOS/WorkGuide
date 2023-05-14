type WorkerRegistration = {
  login : string;
  password: string;
  email : string;
  phoneNumber : string;
  firstName : string;
  secondName : string;
  positionId : string;
  avatar: File | null,
  mentorId: string | null
}

export default WorkerRegistration;