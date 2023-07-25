import { useState } from "react";
import { Spin, Space, Typography } from "antd";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notesApi.ts";
import SingleNote from "./SingleNote";
import SelectButton from "./buttons/SelectButton";
import { ISortNotes, INotes, ISortOptions } from "../interfaces/note.interface.ts";
import "../styles/notes.less";

interface NotesProps {
  isCompleted: boolean;
}

const Notes = ({ isCompleted }: NotesProps) => {
  const [sort, setSort] = useState<number>(0);
  const { Title } = Typography;
  const { isLoading, isError, data } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const sortOptions: ISortOptions[]  = [
    {
      value: 0,
      label: "Más antiguos",
    },
    {
      value: 1,
      label: "Más nuevos",
    },
    {
      value: 2,
      label: "Nombre",
    },
  ];

  if (isLoading)
    return (
      <Space size="middle" style={{position: 'absolute'}}>
        <Spin size="large" />
      </Space>
    );
  if (isError)
    return (
      <Title level={3} className="notes__no-notes">
        Ha ocurrido un error en el servidor, compruebe la base de datos
      </Title>
    );

  const dataSorted =
  sort === 0
    ? data.notes.sort((a: ISortNotes, b: ISortNotes) => moment(a.createdAt).diff(moment(b.createdAt)))
    : sort === 1
    ? data.notes.sort((a: ISortNotes, b: ISortNotes) => moment(b.createdAt).diff(moment(a.createdAt)))
    : sort === 2
    ? data.notes.sort((a: ISortNotes, b: ISortNotes) => a.title.localeCompare(b.title))
    : data.notes.sort((a: ISortNotes, b: ISortNotes) => a.title.localeCompare(b.title));

  return (
    <div className="notes">
      {((data.totalCompleted > 0 && isCompleted) ||
        (data.totalPending > 0 && !isCompleted)) && (
        <div className="select__button-container">
          <span>Ordenar por:</span>
          <SelectButton options={sortOptions} sort={sort} setSort={setSort} />
        </div>
      )}

      <div className="notes__container">
        {data.totalPending === 0 && !isCompleted && (
          <Title level={3} className="notes__no-notes">
            No hay notas pendientes
          </Title>
        )}
        {data.totalCompleted === 0 && isCompleted && (
          <Title level={3} className="notes__no-notes">
            No hay notas completadas
          </Title>
        )}
        {dataSorted?.map((note: INotes) => {
          // eslint-disable-next-line array-callback-return
          if (isCompleted !== note.isCompleted) return;
          return <SingleNote note={note} key={note. id} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
