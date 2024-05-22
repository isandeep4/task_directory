import React from 'react';
import { FileSystemItem } from './FileSystem';

interface MainAreaProps {
  activeItem: FileSystemItem | null;
  activePath: string | null;
  onActivateItem: (item: FileSystemItem, path: string) => void;
}

const MainArea: React.FC<MainAreaProps> = ({ activeItem, activePath, onActivateItem }) => {
  if (!activeItem) {
    return <div className="main-area">Select a file or folder to view details</div>;
  }
  const handleClick = (item: FileSystemItem) => {
    const path = activePath ? `${activePath}/${item.name}` : `/${item.name}`;
    onActivateItem(item, path);
  };

  if (activeItem.type === 'folder') {
    return (
      <div className="main">
          {activeItem.children?.map(child => (
            <div key={child.name} onClick={() => handleClick(child)}  style={{ cursor: 'pointer' }}>
              {child.type === 'file' ? (
              <div>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                  {child.name.split('.').pop()?.charAt(0).toUpperCase() || 'F'}
                </div>
                <div>{child.name}</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                  F
                </div>
                <div>{child.name}</div>
              </div>
            )}
            </div>
          ))}
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
