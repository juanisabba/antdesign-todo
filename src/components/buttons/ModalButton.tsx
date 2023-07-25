import { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditNoteForm from "../forms/NoteForm";
import ViewNoteForm from "../forms/ViewNote";

interface ModalButtonProps {
  type: "new" | "edit" | "view";
  title: string;
  id?: number;
}

const ModalButton: React.FC<ModalButtonProps> = ({ type, title, id } ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {type === "new" && (
        <Button type="primary" onClick={showModal} size="large">
          {title}
        </Button>
      )}
      {type === "edit" && (
        <Tooltip title="Editar">
          <Button
            type="default"
            icon={<EditOutlined />}
            shape="circle"
            onClick={showModal}
          ></Button>
        </Tooltip>
      )}
      {type === "view" && (
        <Button type="link" onClick={showModal}>
          {title}
        </Button>
      )}

      <Modal
        style={{ top: "10%" }}
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {type === "new" && <EditNoteForm setIsModalOpen={setIsModalOpen} />}
        {type === "edit" && (
          <EditNoteForm id={id} setIsModalOpen={setIsModalOpen} />
        )}
        {type === "view" && <ViewNoteForm id={id} />}
      </Modal>
    </>
  );
};

export default ModalButton;
