import React, { useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: 'Is my financial data secure on FinanceIQ?',
      answer:
        'Yes. FinanceIQ uses advanced encryption (AES-256) and secure HTTPS connections to protect your data. All personal and financial details are encrypted both in transit and at rest. We never share or sell your data to anyone.',
    },
    {
      question: 'Can I scan and upload receipts using FinanceIQ?',
      answer:
        'Absolutely! FinanceIQ integrates Google Gemini AI for OCR-based receipt scanning. Just upload a photo of your receipt, and the app automatically extracts merchant name, amount, and date, then categorizes it as a transaction.',
    },
    {
      question: 'Do I need to pay to use FinanceIQ?',
      answer:
        'No. FinanceIQ is completely free to use for personal finance tracking. In future, we may introduce optional premium features like multi-account analytics or AI-based financial insights.',
    },
    {
      question: 'Can I access my account from multiple devices?',
      answer:
        'Yes. FinanceIQ is a web-based app, so you can securely log in from any device—desktop, tablet, or mobile browser. Your data stays synced across all devices automatically.',
    },
    {
      question: 'What happens if I delete my account?',
      answer:
        'When you delete your account from the Settings page, all your data—including transactions, receipts, and analytics—is permanently erased from our servers. This action is irreversible for your privacy and security.',
    },
    {
      question: 'Will there be a mobile app version?',
      answer:
        "We're currently developing a mobile app for both iOS and Android so you can manage your finances on the go. Stay tuned for announcements on our official site!",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Frequently asked questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl hover:border-teal-500 dark:hover:border-teal-400 transition-colors overflow-hidden"
          >
            <button
              type="button"
              className="flex justify-between items-center p-5 w-full text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset rounded-xl"
              onClick={() => toggleFaq(index)}
            >
              <span className="text-base font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transform transition-transform ${
                  activeFaq === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeFaq === index && (
              <div className="px-5 pb-5">
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-base text-gray-600 dark:text-gray-400">
          Still have questions?{' '}
          <a
            href="mailto:support@financeiq.com"
            className="font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            Email our support team
          </a>
          {/* {' '}or{' '}
          <a
            href="#chat"
            className="font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            start a live chat
          </a> */}
          .
        </p>
      </div>
    </div>
  );
};

export default FAQ;

