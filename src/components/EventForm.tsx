import React, { FC } from "react";
import { Select, Button, DatePicker, Form, Input, Row } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypesSelector } from "../hooks/useTypedSelector";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
  const [event, setEvent] = React.useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);
  const { user } = useTypesSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({...event, date: formatDate(date?.toDate())});
    }
  };

  const submitForm = () => {
    submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event name"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setEvent({ ...event, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Event date" name="date" rules={[rules.required()]}>
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Select user" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {guests.map((guest) => (
            <Select.Option
              value={guest.username}
              key={Date.now + guest.username}
            >
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
