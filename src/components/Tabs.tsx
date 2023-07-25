import { Tabs as AntTabs } from "antd";
import Notes from "./Notes";
import { ITabHeader } from "../interfaces/note.interface";

const Tabs = () => {
  const { TabPane } = AntTabs;
  const tabsData: ITabHeader[] = [
    { id: 1, title: 'Pendientes', isCompleted: false },
    { id: 2, title: 'Completadas', isCompleted: true },
  ];
  
  return (
    <>
    <AntTabs defaultActiveKey="1" style={{backgroundColor: '#fff'}} centered>
      {tabsData.map((tab: ITabHeader) => (
        <TabPane tab={tab.title} key={tab.id}>
          <Notes isCompleted={tab.isCompleted} />
        </TabPane>
      ))}
    </AntTabs>
    </>
  );
};

export default Tabs;
