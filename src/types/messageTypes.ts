interface Message {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

export type { Message };
