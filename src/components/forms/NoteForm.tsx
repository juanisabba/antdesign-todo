import { useState, Dispatch, SetStateAction } from "react";
import { Spin, Space, Form, Input } from "antd";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { createNote, getNoteById, updateNote } from "../../api/notesApi";
import SubmitButton from "../buttons/SubmitButton";
import { showNotification } from "../../utlis/notifications";
import { FormValuesProps } from "../../interfaces/note.interface";
import "../../styles/form.less";

interface FormProps {
  id?: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const { TextArea } = Input;

const NoteForm: React.FC<FormProps> = ({ id, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery(["notes", id], () => getNoteById(id), {
    enabled: !!id,
  });

  const addNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const editNoteMutation = useMutation(updateNote, {
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
    onSettled: () => {
      if (note) {
        queryClient.invalidateQueries(["notes"]);
      }
    },
  });

  if (isLoading && id) {
    return (
      <Space
        size="middle"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Spin size="large" />
      </Space>
    );
  }

  if (isError) {
    setIsModalOpen(false);
    showNotification({
      message: "Ha ocurrido un error",
      description:
        "Ha ocurrido un error en el servidor, compruebe la base de datos",
      type: "error",
    });
    return;
  }

  const onFinish = async (values: FormValuesProps) => {
    setIsButtonLoading(true);
    if (id) {
      const note = { id, ...values };
      editNoteMutation.mutate(note);
      showNotification({
        message: "Nota actualizada",
        description: "Se ha actualizado la nota exitosamente",
        type: "success",
      });
    } else {
      const data = {
        id: Math.floor(Math.random() * 10000),
        isCompleted: false,
        createdAt: moment(),
        ...values,
      };
      await addNoteMutation.mutate(data);
      showNotification({
        message: "Nota creada",
        description: "Se ha creado una nueva nota exitosamente",
        type: "success",
      });
      form.resetFields();
    }
    setIsModalOpen(false);
    setIsButtonLoading(false);
  };

  const initialValues = {
    title: note ? note?.title : "",
    description: note ? note?.description : "",
    tag: note ? note?.tag : "",
    endingDate: note ? note?.endingDate : "",
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Fecha de finalización"
          name="endingDate"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <input type="date" />
        </Form.Item>

        <Form.Item>
          <SubmitButton
            isLoading={isButtonLoading}
            type="primary"
            htmlType="submit"
            text={id ? "Guardar cambios" : "Crear nota"}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoteForm;
