import React from 'react';
import { NoticeData, defaultNoticeData } from '../types';
import { RotateCcw, Building2, User, Landmark, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

interface NoticeFormProps {
  data: NoticeData;
  onChange: (data: NoticeData) => void;
}

interface FieldDef {
  name: keyof NoticeData;
  label: string;
  telugu: string;
}

const sections: { title: string; icon: React.ReactNode; color: string; bgColor: string; fields: FieldDef[] }[] = [
  {
    title: 'Branch Info',
    icon: <Building2 size={12} />,
    color: 'var(--primary-600)',
    bgColor: 'rgba(99, 102, 241, 0.08)',
    fields: [
      { name: 'branchName', label: 'Branch Name', telugu: 'బ్రాంచి' },
      { name: 'noticeDate', label: 'Notice Date', telugu: 'తేదీ' },
      { name: 'subjectScheme', label: 'Scheme / Subject', telugu: 'విషయం' },
    ],
  },
  {
    title: 'Borrower Info',
    icon: <User size={12} />,
    color: 'var(--accent-emerald)',
    bgColor: 'rgba(5, 150, 105, 0.08)',
    fields: [
      { name: 'borrowerName', label: 'Borrower Name', telugu: 'తనఖాదారు పేరు' },
      { name: 'fatherName', label: 'Father Name', telugu: 'తండ్రి పేరు' },
      { name: 'village', label: 'Village', telugu: 'ఊరు' },
    ],
  },
  {
    title: 'Loan Details',
    icon: <Landmark size={12} />,
    color: 'var(--accent-amber)',
    bgColor: 'rgba(217, 119, 6, 0.08)',
    fields: [
      { name: 'loanType', label: 'Type of Loan', telugu: 'రుణ రకం' },
      { name: 'loanAccountNumber', label: 'Loan Account No.', telugu: 'లోన్ నెం' },
      { name: 'referenceNumber', label: 'Reference No.', telugu: 'ఖాతా నెం' },
      { name: 'loanAmount', label: 'Loan Amount', telugu: 'అప్పు మొత్తం' },
      { name: 'emiAmount', label: 'EMI Amount', telugu: 'EMI వాయిదా' },
    ],
  },
  {
    title: 'Dates & Charges',
    icon: <CalendarDays size={12} />,
    color: 'var(--accent-rose)',
    bgColor: 'rgba(225, 29, 72, 0.08)',
    fields: [
      { name: 'loanSanctionDate', label: 'Sanction Date', telugu: 'శాంక్షన్ తేదీ' },
      { name: 'noticeDueDate', label: 'Notice Due Date', telugu: 'నోటీసు గడువు' },
      { name: 'auctionDate', label: 'Auction Date', telugu: 'చర్య తేదీ' },
      { name: 'noticeCharges', label: 'Notice Charges', telugu: 'నోటీసు చార్జీలు' },
    ],
  },
];

export const NoticeForm: React.FC<NoticeFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleReset = () => {
    onChange(defaultNoticeData);
  };

  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      {/* Form Header */}
      <div className="form-header">
        <h2>Notice Details</h2>
        <button onClick={handleReset} className="btn-ghost">
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Sections */}
      <div className="form-body">
        {sections.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + sIdx * 0.08 }}
          >
            {/* Section Badge */}
            <div
              className="section-badge"
              style={{ color: section.color, background: section.bgColor }}
            >
              {section.icon}
              {section.title}
            </div>

            {/* Fields Grid */}
            <div className="fields-grid">
              {section.fields.map((field) => (
                <div key={field.name}>
                  <label className="form-label">
                    {field.label}{' '}
                    <span className="form-label-telugu">({field.telugu})</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={data[field.name]}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder={field.telugu}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
