import React, { forwardRef } from 'react';
import { NoticeData } from '../types';

interface NoticePreviewProps {
  data: NoticeData;
}

export const NoticePreview = forwardRef<HTMLDivElement, NoticePreviewProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="notice-document">
      {/* Header */}
      <div className="notice-header">
        <h1 className="notice-bank-name">
          ది జిల్లా సహకార కేంద్ర బ్యాంక్ లి., కాకినాడ
        </h1>
        <h2 className="notice-register-title">రిజిస్టర్ నోటీసు -</h2>
        <p className="notice-urgent">
          గమనిక : ఈ నోటీసును అతిజరుగ నోటీసుగా పరిగణించవలెను
        </p>
      </div>

      {/* Branch and Date */}
      <div className="notice-branch-row">
        <div>
          బ్రాంచి: <span className="notice-highlight">{data.branchName}</span>
        </div>
        <div>
          తేదీ: <span className="notice-highlight">{data.noticeDate}</span>
        </div>
      </div>

      {/* Subject */}
      <div className="notice-subject">
        <p>
          విషయం: బ్యాంకు ద్వారా ఇవ్వబడిన వాయిదా మీరిన <br />
          <span className="notice-highlight">{data.subjectScheme}</span> రుణాలు - రిజిస్టర్
          నోటీసు - గురించి.
        </p>
      </div>

      {/* Divider */}
      <hr className="notice-divider" />

      {/* Body */}
      <div className="notice-body">
        <p className="notice-body-greeting">అయ్యా,</p>
        <p>
          తనఖాదారు పేరు.{' '}
          <span className="notice-highlight">{data.borrowerName}</span> తండ్రి పేరు{' '}
          <span className="notice-highlight">{data.fatherName}</span> ఊరు.{' '}
          <span className="notice-highlight">{data.village}</span> కలిగియున్నారు.
          తమరు పైన తెలుపబడిన అప్పు ను వ్యవసాయం ఖర్చుల నిమిత్తం మా బ్యాంకు బ్రాంచి{' '}
          {data.branchName} నుండి అప్పు శాంక్షన్ కాబడినది. అప్పు ఖాతా నెం.{' '}
          <span className="notice-highlight">{data.referenceNumber}</span> ద్వారా బట్వాడా
          కాబడిన లోన్ నెం.{' '}
          <span className="notice-highlight">{data.loanAccountNumber}</span> శాంక్షన్ కాబడిన
          తేదీ <span className="notice-highlight">{data.loanSanctionDate}</span> Rs.{' '}
          <span className="notice-highlight">{data.loanAmount}</span>
        </p>
        <p className="notice-body-para">
          ఇదే వాయిదా తేదీ మీరి కూడా అప్పు చెల్లించకపోవడము వలన ఎన్ని పర్యాయములు బ్యాంకు
          వారు చరవాణి ద్వారా అడిగినప్పటికీ అప్పునకు{' '}
          <span className="notice-highlight">{data.loanType}</span> పూర్తిగా చెల్లించనందున ఈ నోటీసు
          అందిన వెంటనే తీసుకున్న అప్పునకు{' '}
          <span className="notice-highlight">{data.loanType}</span> మరియు అపరాధపు వడ్డీతో సహా పూర్తిగా
          చెల్లించవలెను. లోను వాయిదా తేదీ:{' '}
          <span className="notice-highlight">{data.noticeDueDate}</span>
        </p>
      </div>

      {/* Loan Details Summary */}
      <div className="notice-details">
        <h3 className="notice-details-title">లోని వివరములు:</h3>
        <table className="notice-details-table">
          <tbody>
            {[
              ['తనఖాదారు పేరు:', data.borrowerName],
              ['రుణ రకం:', data.loanType],
              ['లోన్ నెం:', data.loanAccountNumber],
              ['పొదుపు ఖాతా నెం:', data.referenceNumber],
              ['అప్పు నిల్వ బాకీ - అసలు:', `Rs. ${data.loanAmount}`],
            ].map(([label, value], i) => (
              <tr key={i}>
                <td>{label}</td>
                <td>
                  <span className="notice-highlight">{value}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="notice-emi-row">
          <span>EMI వాయిదా : </span>
          <span className="notice-highlight">{data.emiAmount}</span>
          <span> అపరాధపు వడ్డీ తేదీ. </span>
          <span className="notice-highlight">{data.auctionDate}</span>
          <span> నకు.</span>
        </div>
      </div>

      {/* Footer */}
      <div className="notice-footer">
        <div>
          నోటీసు చార్జీలు: <span className="notice-highlight">{data.noticeCharges}</span>
        </div>
        <div className="notice-signature-area">
          <div className="notice-signature-space" />
          <div className="notice-signature-line">బ్రాంచి మేనేజర్</div>
        </div>
      </div>
    </div>
  );
});

NoticePreview.displayName = 'NoticePreview';
