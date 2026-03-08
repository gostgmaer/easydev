import LegalLayout from "@/components/policy";

export const metadata = {
  title: "Terms & Conditions | EasyDev",
  description:
    "Read EasyDev’s Terms & Conditions governing the use of our website, services, and digital solutions.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="January 2025">
      <h2>1. Introduction</h2>
      <p>
        Welcome to EasyDev. By accessing or using our website and services, you
        agree to comply with and be bound by these Terms & Conditions. If you do
        not agree, please do not use our services.
      </p>

      <h2>2. Services</h2>
      <p>
        EasyDev provides web development, SaaS solutions, backend APIs, DevOps,
        maintenance, and related digital services. Service scope, timelines, and
        pricing are defined individually for each project.
      </p>

      <h2>3. Client Responsibilities</h2>
      <ul>
        <li>Provide accurate project requirements and content</li>
        <li>Ensure timely communication and approvals</li>
        <li>Respect agreed payment schedules</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        Upon full payment, the client receives rights to the final delivered
        work unless otherwise agreed. EasyDev retains the right to showcase
        completed projects in its portfolio.
      </p>

      <h2>5. Payments & Refunds</h2>
      <p>
        All payments are non-refundable once work has commenced unless stated
        otherwise in a written agreement.
      </p>

      <h2>6. Confidentiality</h2>
      <p>
        Both parties agree to keep confidential information private unless
        disclosure is required by law.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        EasyDev shall not be liable for indirect, incidental, or consequential
        damages arising from the use of our services.
      </p>

      <h2>8. Termination</h2>
      <p>
        Either party may terminate a project with written notice. Completed work
        up to the termination date must be paid for.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes shall fall
        under the jurisdiction of Mumbai courts.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any questions regarding these Terms, contact us at{" "}
        <strong>contact@easydev.in</strong>.
      </p>
    </LegalLayout>
  );
}
