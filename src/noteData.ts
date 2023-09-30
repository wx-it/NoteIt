// NoteData.ts
interface NoteData {
  id: string;
  title: string;
  content: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export default NoteData;
