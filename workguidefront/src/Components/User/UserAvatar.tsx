import React from 'react';
import Avatar from 'react-avatar';
import UseBaseInfo from '../../Types/UserBaseInfo';



interface IUserAvatar {
  userInfo: UseBaseInfo;
}

const UserAvatar: React.FC<IUserAvatar> = props => {
  const picPath = props.userInfo.avatar

  return (
    <React.Fragment>
      {props.userInfo &&
        (props.userInfo.avatar ? (
          <Avatar alt={props.userInfo.userName} src={picPath} />
        ) : (
          <Avatar name={props.userInfo.userName} size="150" />
        ))}
    </React.Fragment>
  );
};
export default UserAvatar;
