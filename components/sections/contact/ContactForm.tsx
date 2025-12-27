import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, User, Mail, Phone, Building, CheckCircle } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormData,
} from "../../../lib/validations";
import {
  SERVICE_OPTIONS,
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
} from "../../../data/contact";
import FormField from "./FormField";
import { submitContactForm } from "@/lib/api";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      client: {
        name: "",
        email: "",
        phone: "",
        companyName: "",
      },
      projectDetails: {
        servicesInterested: [],
        budgetRange: "",
        timelinePreference: "",
      },
      message: {
        subject: "Website Development Request",
        body: "",
      },
      preferences: {
        preferredContactMethod: "Email",
        newsletterOptIn: false,
        privacyConsent: false,
      },
    },
  });

  const watchedServices = watch("projectDetails.servicesInterested");
  const messageLength = watch("message.body")?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await submitContactForm(data);
      setSubmitSuccess(true);
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 15000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again or contact me directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your inquiry. I&lsquo;ll get back to you within 24
            hours.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Tell Me About Your Project
        </h3>
        <p className="text-gray-600">
          The more details you provide, the better I can understand your needs
          and provide an accurate quote.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Client Information */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Contact Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" required error={errors.client?.name}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("client.name")}
                  type="text"
                  placeholder="Your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.client?.name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </FormField>

            <FormField
              label="Email Address"
              required
              error={errors.client?.email}
            >
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("client.email")}
                  type="email"
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.client?.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Phone Number" error={errors.client?.phone}>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("client.phone")}
                  type="tel"
                  placeholder="+91 758 567 890"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.client?.phone
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </FormField>

            <FormField label="Company Name" error={errors.client?.companyName}>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("client.companyName")}
                  type="text"
                  placeholder="Your company"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.client?.companyName
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </FormField>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Project Details
          </h4>

          <Controller
            name="projectDetails.servicesInterested"
            control={control}
            render={({ field }) => (
              <FormField
                label="Services Interested"
                required
                // error={errors.projectDetails?.servicesInterested}
                description={`${watchedServices.length} service${
                  watchedServices.length !== 1 ? "s" : ""
                } selected`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {SERVICE_OPTIONS.map((service) => (
                    <label
                      key={service.key}
                      className="inline-flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        value={service.key}
                        checked={field.value.includes(service.key)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newValue = e.target.checked
                            ? [...field.value, value]
                            : field.value.filter((v) => v !== value);
                          field.onChange(newValue);
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {service.value}
                      </span>
                    </label>
                  ))}
                </div>
              </FormField>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Project Budget"
              error={errors.projectDetails?.budgetRange}
            >
              <select
                {...register("projectDetails.budgetRange")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white ${
                  errors.projectDetails?.budgetRange
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">Select budget range</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Timeline"
              error={errors.projectDetails?.timelinePreference}
            >
              <select
                {...register("projectDetails.timelinePreference")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white ${
                  errors.projectDetails?.timelinePreference
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">Select timeline</option>
                {TIMELINE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-6">
          {/* <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Project Message
          </h4> */}

          {/* <FormField
            label="Project Type"
            required
            error={errors.message?.subject}
            description="Briefly describe what type of project this is"
          >
            <input
              {...register("message.subject")}
              type="text"
              placeholder="e.g. E-commerce website, SaaS dashboard, Mobile app"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.message?.subject
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </FormField> */}

          <FormField
            label="Project Description"
            required
            error={errors.message?.body}
            description={`${messageLength}/2000 characters - Please provide detailed information about your requirements`}
          >
            <textarea
              {...register("message.body")}
              placeholder="Please describe your project requirements, goals, target audience, specific features you need, design preferences, and any other important details..."
              rows={8}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                errors.message?.body
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </FormField>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Communication Preferences
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Preferred Contact Method"
              error={errors.preferences?.preferredContactMethod}
            >
              <select
                {...register("preferences.preferredContactMethod")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </FormField>

            <div className="flex flex-col justify-center space-y-4">
              <label className="inline-flex items-start space-x-3">
                <input
                  {...register("preferences.newsletterOptIn")}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I&apos;d like to receive occasional updates about new services
                  and web development tips.
                </span>
              </label>

              <FormField label="" error={errors.preferences?.privacyConsent}>
                <label className="inline-flex items-start space-x-3">
                  <input
                    {...register("preferences.privacyConsent")}
                    type="checkbox"
                    className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 ${
                      errors.preferences?.privacyConsent ? "border-red-300" : ""
                    }`}
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the Privacy Policy and Terms of Service *
                  </span>
                </label>
              </FormField>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            What happens next?
          </h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Your project details are reviewed within 24 hours
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              A detailed proposal with timeline and pricing is sent
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              A call is scheduled to discuss your requirements
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Work starts once terms are agreed upon
            </li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
