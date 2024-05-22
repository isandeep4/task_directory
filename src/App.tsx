import { useEffect, useState } from 'react';
import Sidebar from './component/Sidebar';
import fileSystem, { FileSystemItem } from './component/FileSystem';

export function App() {
  // Do not hesitate to refactor this effect or use a different library to retrieve data
  // it's only provided here as an example on how to fetch the data from the server
  useEffect(() => {
    fetch('http://localhost:8010/api/v1/tree')
      .then((r) => r.json())
      .then(console.log);
  }, []);
  const [activeItem, setActiveItem] = useState<FileSystemItem | null>(null);

  const handleActivateItem = (item: FileSystemItem) => {
    setActiveItem(item);
  };

  return (
    <div className="app">
      <div className="topbar">
        <h1>Home Assignment</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Sidebar fileSystem={fileSystem} onActivateItem={handleActivateItem} />
        </div>
      </div>
    </div>
  );
}
