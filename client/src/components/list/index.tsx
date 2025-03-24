import React from "react";
import { FindResult, User } from "../../utils/type";
import UserInfo from "../item";
import "./style.css";

interface UserListProps {
  data: FindResult<User>;
}
const UserList = (props: UserListProps) => {
  const { data } = props;
  console.log("data", data.data);

  return (
    <div className="user-list">
      {data?.data?.map((user) => (
        <UserInfo key={user.id} user={user} />
      ))}
    </div>
  );
};

export default React.memo(UserList, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});
