import React, { useState } from 'react';
import { FileSystemItem } from './FileSystem';

interface SidebarProps {
    fileSystem: FileSystemItem[];
    onActivateItem: (item: FileSystemItem) => void;
}
const Sidebar: React.FC<SidebarProps> = ({fileSystem, onActivateItem}) => {
    const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
    const toggleFolder = (path: string) => {
        setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
      };
    const renderFileSystem = (items: FileSystemItem[], path="") => {
        const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
        return sortedItems.map((item, index)=>{
            const itemPath = `${path}/${item.name}`;
            if(item.type === 'folder'){
                return (
                    <div key={itemPath} style={{ paddingLeft: 20 }}>
                        <div onClick={() => { toggleFolder(itemPath); onActivateItem(item); }} style={{ cursor: 'pointer' }}>
                            {expandedFolders[itemPath] ? '▼' : '▶'} {item.name}
                            </div>
                            {expandedFolders[itemPath] && (
                                <div style={{ paddingLeft: 20 }}>
                                    {renderFileSystem(item.children!, itemPath)}
                                </div>
                            )}
                    </div>
                )
            }
            return (
                <div key={itemPath} onClick={() => onActivateItem(item)} style={{ paddingLeft: 40, cursor: 'pointer' }}>
                  {item.name}
                </div>
            );
        })
    };
    return (
        <div className="sidebar">
          {renderFileSystem(fileSystem)}
        </div>
      );

}

export default Sidebar;
