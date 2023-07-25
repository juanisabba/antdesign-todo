import { Typography } from "antd";
import Tabs from "./components/Tabs";
import ModalButton from "./components/buttons/ModalButton";
import "./App.less";

const App: React.FC = () => {
  const { Title } = Typography;
  return (
    <div className="App">
      <header>
        <Title>TODO App made by Juani</Title>
        <ModalButton type="new" title="Crear nueva nota" />
      </header>
      <Tabs />
    </div>
  );
};

export default App;
