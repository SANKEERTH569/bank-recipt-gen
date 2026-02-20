export interface NoticeData {
  branchName: string;
  noticeDate: string;
  subjectScheme: string;
  borrowerName: string;
  fatherName: string;
  village: string;
  loanType: string;
  loanAccountNumber: string;
  referenceNumber: string;
  loanSanctionDate: string;
  loanAmount: string;
  emiAmount: string;
  noticeDueDate: string;
  auctionDate: string;
  noticeCharges: string;
}

export const defaultNoticeData: NoticeData = {
  branchName: "",
  noticeDate: "",
  subjectScheme: "",
  borrowerName: "",
  fatherName: "",
  village: "",
  loanType: "",
  loanAccountNumber: "",
  referenceNumber: "",
  loanSanctionDate: "",
  loanAmount: "",
  emiAmount: "",
  noticeDueDate: "",
  auctionDate: "",
  noticeCharges: "",
};
