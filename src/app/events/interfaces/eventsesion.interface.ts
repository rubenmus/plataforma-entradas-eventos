export interface Event {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Session {
  date: string;
  availability: number;
}

export interface EventSession {
  event: Event;
  sessions: Session[];
}
