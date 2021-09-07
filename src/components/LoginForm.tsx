import React, { FC } from "react";
import { Form, Input, Button } from "antd";
import { rules } from "../utils/rules";
import { useTypesSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const LoginForm: FC = () => {
  const { isLoading, error } = useTypesSelector((state) => state.auth);
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const {login} = useActions();

  const submit = () => {
    login(userName, password);
  };

  return (
    <Form onFinish={submit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form.Item
        label="User name"
        name="username"
        rules={[rules.required("Please input your user name!")]}
      >
        <Input
          value={userName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setUserName(event.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required("Please input your user password!")]}
      >
        <Input
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setPassword(event.target.value);
          }}
          type={"password"}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
