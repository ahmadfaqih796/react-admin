import React from "react";
import client from "../services/FeathersClient";
import BaseService from "../services/BaseService";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button, Card, Input, Typography } from "@mui/material";
import { useFormik } from "formik";

const MessageService = client.service("messages");

const ChatPage = () => {
  const [messageList, setMessageList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const token = useAuthHeader();
  const service = new BaseService();

  React.useEffect(() => {
    getMessages();
  }, []);

  React.useEffect(() => {
    const createdListener = (message) => {
      console.log("first message", message);
      setMessageList((prevMessages) => [...prevMessages, message]);
    };
    MessageService.on("created", (message) => {
      console.log("xxxxxxxxxx", message);
    });

    return () => {
      MessageService.off("created", (message) => {
        console.log("rerere", message);
      });
    };
  }, []);

  const getMessages = async () => {
    try {
      const response = await service.get("/messages", {
        headers: {
          Authorization: token,
        },
      });
      setMessageList(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      service
        .post("/messages", values, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("masuk", response);
          MessageService.on("created", (message) => {
            console.log("xxxxxxxxxx", message);
          });
          formik.resetForm();
        })
        .catch((err) => {
          console.error("Error creating message", err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div>
      {messageList.map((message, index) => (
        <Card key={index} sx={{ maxWidth: 345, mb: 2 }}>
          <Typography>{message?.user?.fullname}</Typography>
          <Typography>{message.comment}</Typography>
        </Card>
      ))}
      <form onSubmit={formik.handleSubmit}>
        <Input
          placeholder="comment"
          type="text"
          id="comment"
          name="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
          //  invalid={!!formik.errors.comment}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChatPage;
