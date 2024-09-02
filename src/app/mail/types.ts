export interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  body: string;
  date: string | number;
  read: boolean;
  labels: string[];
}

export interface MailDisplayProps {
  mail: Mail | null;
}

export interface MailProps {
  account: {
    label: string;
    email: string;
  };
  mails: Mail[];
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export interface MailListProps {
  items: Mail[];
}

export interface Folder {
  id: string;
  name: string;
}
