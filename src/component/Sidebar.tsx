import React, { useEffect, useState } from 'react';
import { FileSystemItem } from './FileSystem';

interface SidebarProps {
    fileSystem: FileSystemItem[];
    onActivateItem: (item: FileSystemItem) => void;
    activePath: string | null;
}
const Sidebar: React.FC<SidebarProps> = ({fileSystem, onActivateItem, activePath}) => {
    const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
    const toggleFolder = (path: string) => {
        setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
      };
    const handleItemClick = (item: FileSystemItem, itemPath: string) => {
    if (item.type === 'folder') {
        toggleFolder(itemPath);
    }
    onActivateItem(item);
    };
    useEffect(() => {
    if (activePath) {
        const paths = activePath.split('/');
        let currentPath = '';
        const newExpandedFolders: { [key: string]: boolean } = {};
        paths.forEach((path, index) => {
        if (path) {
            currentPath += `/${path}`;
            newExpandedFolders[currentPath] = true;
        }
        });
        setExpandedFolders((prev) => ({ ...prev, ...newExpandedFolders }));
    }
    }, [activePath]);
    const renderFileSystem = (items: FileSystemItem[], path="") => {
        const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
        return sortedItems.map((item, index)=>{
            const itemPath = `${path}/${item.name}`;
            if(item.type === 'folder'){
                return (
                    <div key={itemPath} style={{ paddingLeft: 20 }}>
                        <div onClick={() => handleItemClick(item, itemPath)} style={{ cursor: 'pointer' }}>
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
