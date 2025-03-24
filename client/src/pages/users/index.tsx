import React, { useEffect, useRef, useState } from "react";
import UserList from "../../components/list";
import { FindResult, User } from "../../utils/type";
import axiosClient from "../../utils/axios-config";
import Pagination from "../../components/pagination";

const UserPage = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    page: 1,
    limit: 20,
  });
  const [userData, setUserData] = useState<FindResult<User>>({ data: [] });
  const hasFetched = useRef(false);

  const fetchUser = async (params: any = {}) => {
    let userParams = { ...searchParams, ...params };
    try {
      const res = await axiosClient.get("/users", { params: userParams });
      setUserData(res);
      setSearchParams(userParams);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUser();
      hasFetched.current = true; // Đánh dấu đã fetch
    }
  }, []);

  return (
    <div>
      <UserList data={userData} />
      <Pagination
        currentPage={userData.page || 1}
        itemsPerPage={userData.limit || 0}
        totalItems={userData.count || 0}
        onPageChange={(page) => fetchUser({ page })}
      />
    </div>
  );
};

export default UserPage;
