import { CommentDetail } from "./comment-detail.model";

export class MessageDetail {
  public Id?: number;
  public TextMessage: string;
  public CurrentDate: Date;
  public ListOfComments: CommentDetail[];
  public Email: string;
  public IsApproved: boolean;
  public IsDeleted: boolean;
  public Group: string;
  public Attachments: AttachmentList[];
  public LikeCounter?: number;
  public UserLikeList?: UserLike[];
  // public fileUpload: File;
}

export class LikeRequest {
  public MessageId: number;
  public Email: string;
}

export class Document {
  public DocumentId: number;
  public Time: Date;
  public Title: string;
  public Attachment: AttachmentList;
};

export class AttachmentList {
  AttachmentId: number;
  AttachmentFileName: string;
  AttachmentFileReference: string;
}

export class Employee {
  public EmployeeId?: number;
  public Firstname: string;
  public Lastname: string;
  public Department: string;
  public Position: string;
  public EndOfWork: Date;
  public StartOfWork: Date;
  public Email: string;
  public Telephone?: string;
  public EmployeePicture: AttachmentList;
}
export class UserLike {
  public LikeId: number;
  public Email: string;
  public IsLiked: boolean;
}

export class Documentation {
  public Id: string;
  public Title: string;
  public Group: string;
  public Link: string;
}

export class Literature {
  public Id?: string;
  public Title: string;
  public Group: string;
  public Link?: string;
  public Files?: AttachmentList;
  public Email: string;
  public IsApproved: boolean;
  public IsDeleted: boolean;
}

export class Schedule {
  public Id: string;
  public Url: string;
}

export class Meetings {
  public Id: string;
  public Url: string;
}

export class News {
  public Id?: string;
  public Content: string;
  public DateNow?: Date;
  public DateOfEvent: Date;
}
