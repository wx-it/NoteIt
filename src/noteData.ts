// NoteData.ts
interface NoteData {
  id: string;
  title: string;
  content: string;
  createdAt: string | number | Date | undefined;
  updatedAt: string | number | Date | undefined;
}

export default NoteData;
