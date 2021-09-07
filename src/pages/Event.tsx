import { Button, Layout, Modal, Row } from "antd";
import React, { FC } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypesSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";




const Event: FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const {fetchGuests, createEvent, fetchEvents} = useActions();
  const {guests, events} = useTypesSelector(state=> state.event);
  const {user} = useTypesSelector(state=> state.auth);

  React.useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])

  const addNewEvent = (event:IEvent) => {
    setVisible(false)
    createEvent(event)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button type="primary" onClick={() => setVisible(!visible)}>
          Add event
        </Button>
      </Row>
      <Modal
        title="Add event"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(!visible)}
      >
        <EventForm submit={addNewEvent} guests={guests} />
      </Modal>
    </Layout>
  );
};

export default Event;
