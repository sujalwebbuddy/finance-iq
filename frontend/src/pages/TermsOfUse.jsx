import React, { useEffect } from 'react';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <LandingHeader />
      
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Use
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Please read these terms carefully before using FinanceIQ.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-12 shadow-lg space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By accessing and using FinanceIQ, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Description of Service
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  FinanceIQ is a personal finance management application that provides users with tools to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Track income and expenses</li>
                  <li>Manage budgets and financial goals</li>
                  <li>Upload and process receipts using OCR technology</li>
                  <li>Set up recurring transactions</li>
                  <li>View financial analytics and reports</li>
                  <li>Export financial data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. User Accounts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  To use certain features of FinanceIQ, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and identification</li>
                  <li>Accept all responsibility for activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Subscription Plans and Payments
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  FinanceIQ offers multiple subscription plans (Free, Basic, Pro, Enterprise) with different features and limits. 
                  By subscribing to a paid plan, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Pay all fees associated with your chosen subscription plan</li>
                  <li>Understand that subscription fees are billed in advance on a recurring basis</li>
                  <li>Accept that all fees are non-refundable except as required by law</li>
                  <li>Authorize us to charge your payment method for all applicable fees</li>
                  <li>Understand that subscription limits are enforced based on your current plan</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. User Content and Data
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You retain ownership of all data and content you upload to FinanceIQ. By using our service, you grant us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>A license to store, process, and display your data as necessary to provide the service</li>
                  <li>Permission to use aggregated, anonymized data for service improvement</li>
                  <li>Authorization to process receipts using OCR technology for transaction extraction</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  You are responsible for ensuring that any content you upload does not violate any laws or third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Prohibited Uses
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You agree not to use FinanceIQ to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit any malicious code, viruses, or harmful data</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to access the service without permission</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  All content, features, and functionality of FinanceIQ, including but not limited to text, graphics, logos, 
                  icons, images, and software, are the exclusive property of FinanceIQ and its licensors and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Disclaimer of Warranties
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  FinanceIQ is provided "as is" and "as available" without warranties of any kind, either express or implied. 
                  We do not guarantee that the service will be uninterrupted, secure, or error-free. We are not responsible for 
                  any financial decisions you make based on information provided by the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To the maximum extent permitted by law, FinanceIQ and its affiliates shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Termination
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We reserve the right to suspend or terminate your account and access to the service at any time, with or 
                  without cause or notice, for any reason including, but not limited to, breach of these Terms of Use. 
                  You may also terminate your account at any time by contacting us or using the account deletion feature.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes by 
                  posting the new Terms of Use on this page and updating the "Last updated" date. Your continued use of 
                  the service after such modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  12. Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us through our 
                  <a href="/contact" className="text-teal-500 dark:text-teal-400 hover:underline ml-1">contact page</a>.
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default TermsOfUse;

