import React from "react";
import { User } from "../../utils/type";
import "./style.css";

interface UserInfoProps {
  user: User;
}

const UserInfo = (props: UserInfoProps) => {
  const { user } = props;

  return (
    <div className="user-info">
      {/* <div className="user-info__header">
        <div>ID</div>
        <div>Tên</div>
        <div>Email</div>
        <div>Số điện thoại</div>
        <div>Trạng thái</div>
      </div> */}

        <li className="user-info__item">
          <div className="user-info__id">{user.id}</div>
          <div className="user-info__name">
            {user.firstName + " " + user.lastName}
          </div>
          <div className="user-info__email">{user.email}</div>
          <div className="user-info__phone">{user.phoneNo}</div>
          <div
            className={`user-info__status ${
              user.isActive
                ? "user-info__status--active"
                : "user-info__status--inactive"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </div>
        </li>
    </div>
  );
};

export default UserInfo;
