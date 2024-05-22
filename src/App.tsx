import { useEffect, useState } from 'react';
import Sidebar from './component/Sidebar';
import { FileSystemItem } from './component/FileSystem';
import './App.css';
import MainArea from './component/MainArea';
import { fetchData } from './service';

export function App() {
  const [activeItem, setActiveItem] = useState<FileSystemItem | null>(null);
  const [activePath, setActivePath] = useState<string>('');
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>([]);
  console.log("fileSystem", fileSystem)

  const handleActivateItem = (item: FileSystemItem, path: string) => {
    setActiveItem(item);
    setActivePath(path);
  };
  useEffect(() => {
    const loadTreeData = async () => {
      try {
        const response = await fetchData();
        setFileSystem(response);
      } catch (error) {
        console.error('Error loading tree data:', error);
      }
    };

    loadTreeData();
  }, []);

  return (
    <div className="app">
      <div className="topbar">
        <h1>Home Assignment</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Sidebar fileSystem={fileSystem} activePath={activePath} onActivateItem={(item) => handleActivateItem(item, `${activePath}/${item.name}`)} />
        </div>
        <div className="main">
          <MainArea activeItem={activeItem} activePath={activePath} onActivateItem={handleActivateItem} />
        </div>
      </div>
    </div>
  );
}
