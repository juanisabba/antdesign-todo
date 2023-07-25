import { Spin, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getNoteById } from "../../api/notesApi";
import "../../styles/view-card.less";

interface ViewNoteProps {
  id: number | undefined;
}

const ViewNote: React.FC<ViewNoteProps> = ({ id }) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery(["notes", id], () => getNoteById(id));
  if (isLoading) {
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
    return (
      <div>Ha ocurrido un error en el servidor, compruebe la base de datos</div>
    );
  }

  return (
    <div className="view__card-container">
      <div className="view__card-label">
        <b>Título: </b> {note.title}
      </div>
      <div className="view__card-label">
        <b>Descripción: </b> {note.description}
      </div>
      <div className="view__card-label">
        <b>Tag: </b> {note.tag}
      </div>
      <div className="view__card-label">
        <b>Estado: </b> {note.isCompleted ? "Completada" : "Pendiente"}
      </div>
      <div className="view__card-label">
        <b>Fecha de creación: </b>
        {moment(note.createdAt).format("DD/MM/YYYY, hh:mm")}hs
      </div>
      <div className="view__card-label">
        <b>Fecha de finalización: </b>{" "}
        {moment(note.endingDate).format("DD/MM/YYYY")}
      </div>
    </div>
  );
};

export default ViewNote;
