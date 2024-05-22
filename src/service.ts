export interface FileSystemItem {
  type: 'file' | 'folder';
  name: string;
  children?: FileSystemItem[];
}

const API_URL = 'http://localhost:8010/api/v1/tree';

export const fetchData = async (): Promise<FileSystemItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const { data }: { data: FileSystemItem[] } = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch tree data:', error);
    throw error;
  }
};
