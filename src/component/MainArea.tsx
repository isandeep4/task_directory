import React from 'react';
import { FileSystemItem } from './FileSystem';

interface MainAreaProps {
  activeItem: FileSystemItem | null;
}

const MainArea: React.FC<MainAreaProps> = ({ activeItem }) => {
  if (!activeItem) {
    return <div className="main-area">Select a file or folder to view details</div>;
  }

  if (activeItem.type === 'folder') {
    return (
      <div className="main-area">
        <h2>{activeItem.name}</h2>
        <p>Type: Folder</p>
        <div>
          {activeItem.children?.map(child => (
            <div key={child.name}>
              {child.name} ({child.type})
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="main-area">
      <h2>{activeItem.name}</h2>
      <p>Type: File</p>
    </div>
  );
};

export default MainArea;
