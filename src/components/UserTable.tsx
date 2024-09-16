import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUsers } from "../features/users/usersSlice";

export const UserTable = () => {
  const usersState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {usersState.loading === "fulfilled" && usersState.users.length > 0 && (
        <div>
          {usersState.users.map((user) => (
            <p key={user.name}>
              {user.name} {user.username} {user.email} {user.phone}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
