import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy | EasyDev",
  description:
    "Learn how EasyDev collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 2025">
      <h2>1. Overview</h2>
      <p>
        EasyDev respects your privacy and is committed to protecting your
        personal information. This policy explains how we collect, use, and
        safeguard your data.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>Name, email address, and contact details</li>
        <li>Project-related information</li>
        <li>Website usage data and analytics</li>
      </ul>

      <h2>3. How We Use Information</h2>
      <ul>
        <li>To communicate about projects and inquiries</li>
        <li>To deliver and improve our services</li>
        <li>For internal analytics and performance monitoring</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        We may use cookies to improve user experience and analyze traffic. You
        can disable cookies in your browser settings.
      </p>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell or rent your personal data. Information may be shared
        only with trusted partners when required to deliver services.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We implement reasonable technical and organizational measures to protect
        your information from unauthorized access or disclosure.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not
        responsible for their privacy practices.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data by
        contacting us.
      </p>

      <h2>9. Policy Updates</h2>
      <p>
        We may update this Privacy Policy periodically. Changes will be posted
        on this page.
      </p>

      <h2>10. Contact</h2>
      <p>
        If you have questions about this Privacy Policy, email us at{" "}
        <strong>contact@easydev.in</strong>.
      </p>
    </LegalLayout>
  );
}
