import React, { useEffect } from 'react';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                  1. Introduction
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  FinanceIQ ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you use our personal finance management 
                  application. Please read this policy carefully to understand our practices regarding your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                  2.1 Personal Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  When you register for an account, we collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Name and email address</li>
                  <li>Password (stored in encrypted form)</li>
                  <li>Profile information (optional)</li>
                  <li>Authentication information if you use Google OAuth</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                  2.2 Financial Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  To provide our services, we collect and store:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Transaction records (income and expenses)</li>
                  <li>Budget information</li>
                  <li>Receipt images and extracted data via OCR</li>
                  <li>Recurring transaction settings</li>
                  <li>Financial goals and targets</li>
                  <li>Currency preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                  2.3 Usage Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We automatically collect information about how you use our service:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Error logs and performance data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and manage your financial data</li>
                  <li>Process receipts using OCR technology (Google Gemini AI)</li>
                  <li>Generate analytics, reports, and insights</li>
                  <li>Manage your subscription and process payments</li>
                  <li>Send important service updates and notifications</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Detect and prevent fraud or unauthorized access</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Data Storage and Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Data encryption in transit (HTTPS/TLS)</li>
                  <li>Encrypted password storage using bcrypt</li>
                  <li>Secure authentication using JWT tokens</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Secure cloud storage (MongoDB Atlas)</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive 
                  to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Third-Party Services
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use the following third-party services that may collect or process your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li><strong>MongoDB Atlas:</strong> Database hosting and storage</li>
                  <li><strong>Google Gemini AI:</strong> OCR processing for receipt extraction</li>
                  <li><strong>Stripe:</strong> Payment processing and subscription management</li>
                  <li><strong>Google OAuth:</strong> Authentication (if you choose to use Google sign-in)</li>
                  <li><strong>Netlify/Render:</strong> Application hosting</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  These services have their own privacy policies. We encourage you to review them to understand how they 
                  handle your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Data Sharing and Disclosure
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We do not sell your personal or financial data. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our service</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
                  <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Your Rights and Choices
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li><strong>Access:</strong> Request access to your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Export:</strong> Export your financial data in CSV format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Account Settings:</strong> Manage your privacy preferences in account settings</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  To exercise these rights, please contact us through our 
                  <a href="/contact" className="text-teal-500 dark:text-teal-400 hover:underline ml-1">contact page</a> or 
                  use the account deletion feature in your settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Data Retention
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We retain your personal information for as long as your account is active or as needed to provide you services. 
                  If you delete your account, we will delete or anonymize your personal information within 30 days, except where 
                  we are required to retain it for legal or regulatory purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Children's Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  FinanceIQ is not intended for users under the age of 18. We do not knowingly collect personal information 
                  from children. If you believe we have collected information from a child, please contact us immediately, 
                  and we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. International Data Transfers
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  These countries may have data protection laws that differ from those in your country. By using our service, 
                  you consent to the transfer of your information to these countries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this 
                  policy periodically to stay informed about how we protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  12. Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                  please contact us through our 
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

export default PrivacyPolicy;

