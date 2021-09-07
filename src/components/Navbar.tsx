import React, { FC } from "react";
import { Layout, Row, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { RouteName } from "../routes";
import { useTypesSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { AuthActionsCreators } from "../store/reducers/auth/actions-creators";

const Navbar: FC = () => {
  const router = useHistory();
  const { isAuth, user } = useTypesSelector((state) => state.auth);
  const dispatch = useDispatch();
  const test = () => {
    dispatch(AuthActionsCreators.logout);
  };

  return (
    <Layout.Header>
      <Row justify="end">
        {!isAuth ? (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key={1} onClick={() => router.push(RouteName.LOGIN)}>
              Login
            </Menu.Item>
          </Menu>
        ) : (
          <>
            <div style={{ color: "white" }} className="user">
              {user.username}
            </div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item key={2} onClick={test}>
                Log out
              </Menu.Item>
            </Menu>
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
