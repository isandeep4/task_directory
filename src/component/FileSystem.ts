export interface FileSystemItem {
  type: 'file' | 'folder';
  name: string;
  children?: FileSystemItem[];
}

const fileSystem: FileSystemItem[] = [
  {
    type: 'folder',
    name: 'Documents',
    children: [
      {
        type: 'folder',
        name: 'Folder 1',
        children: [],
      },
      {
        type: 'folder',
        name: 'Folder 2',
        children: [
          {
            type: 'file',
            name: 'Document 1.doc',
          },
          {
            type: 'folder',
            name: 'Folder 2-1',
            children: [],
          },
          {
            type: 'folder',
            name: 'Folder 2-2',
            children: [],
          },
          {
            type: 'file',
            name: 'Image 1.jpg',
          },
        ],
      },
    ],
  },
];

export default fileSystem;
