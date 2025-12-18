import React from 'react';

const PricingFAQ = () => {
  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer:
        'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express) through our secure Stripe payment processor.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Yes! Our Free plan is available forever with no credit card required. You can also start with any paid plan and cancel anytime.',
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer:
        'You\'ll receive notifications when approaching your limits. To continue using the service, you can upgrade to a higher plan.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Absolutely! You can cancel your subscription at any time from your settings page. Your access will continue until the end of your billing period.',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        'All payments are non-refundable. We encourage you to review your plan selection carefully before subscribing. If you have any concerns, please contact our support team.',
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about our pricing
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;

