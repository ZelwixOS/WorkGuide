import Avatar from '@mui/material/Avatar';
import React from 'react';
import UseBaseInfo from '../../Types/UserBaseInfo';

interface IUserAvatar {
  userInfo: UseBaseInfo;
}

const UserAvatar: React.FC<IUserAvatar> = props => {
  const picPath = props.userInfo?.avatar?.includes('http')
    ? props.userInfo?.avatar
    : props.userInfo.avatar;

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  const stringAvatar = (name: string) => ({
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  });

  return (
    <React.Fragment>
      {props.userInfo &&
        (props.userInfo.avatar ? (
          <Avatar alt={props.userInfo.userName} src={picPath} />
        ) : (
          <Avatar {...stringAvatar(props.userInfo.userName)} />
        ))}
    </React.Fragment>
  );
};
export default UserAvatar;
