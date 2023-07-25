import { Card, Checkbox } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api/notesApi.ts";
import ModalButton from "./buttons/ModalButton";
import { showNotification } from "../utlis/notifications";
import { INotes } from "../interfaces/note.interface.ts";

interface SingleNoteProps {
  note: INotes;
}

const SingleNote = ({ note }: SingleNoteProps) => {
  const queryClient = useQueryClient();

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const handleChangeStatus = () => {
    updateNoteMutation.mutate({
      ...note,
      isCompleted: true,
    });
    showNotification({
      message: "Nueva nota completada",
      description: 'Se ha cambiado el estado de la nota a "Completada".',
      type: "success",
    });
  };

  return (
    <Card
      key={note.id}
      title={note.title}
      bordered={false}
      extra={
        !note.isCompleted && (
          <ModalButton type="edit" title="Editar nota" id={note.id} />
        )
      }
      className="notes__card"
    >
      <div className="notes__card-description">{note.description}</div>
      <div className="notes__card-tag-container">
        Tag: <div className="notes__card-tag">{note.tag}</div>
      </div>
      <footer>
        <div>
          <Checkbox
            onChange={handleChangeStatus}
            checked={note.isCompleted}
            style={{ visibility: note.isCompleted ? "hidden" : "visible" }}
          >
            ¿Esta tarea ya está completada?
          </Checkbox>
        </div>
        <ModalButton type="view" title="Ver detalles" id={note.id} />
      </footer>
    </Card>
  );
};

export default SingleNote;
