import {  notification } from "antd";
import { IconType } from "antd/es/notification/interface";

interface NotificationProps {
  message: string;
  description: string;
  type: IconType;
}

export const showNotification = ({message, description, type}: NotificationProps) => {
    notification.open({
      message,
      description,
      placement: "bottomLeft",
      type
    });
  };