"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';



import { z } from 'zod';
import { submitContactForm, submitContactFormPre } from '@/lib/api';
export const contactFormSchema = z.object({
  client: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    companyName: z
      .string()
      .max(100, "Company name must be less than 100 characters")
      .optional(),
  }),

  message: z.object({
    subject: z
      .string()
      .min(5, "Subject must be at least 5 characters")
      .max(100, "Subject must be less than 100 characters"),
    body: z
      .string()
      .min(20, "Please provide more details about your project (minimum 20 characters)")
      .max(2000, "Message must be less than 2000 characters"),
  }),
  preferences: z.object({
    preferredContactMethod: z.enum(["Email", "Phone", "WhatsApp"]),
    newsletterOptIn: z.boolean(),
    privacyConsent: z
      .boolean()
      .refine(val => val === true, "You must agree to the Privacy Policy"),
  }),
});

export type ContactFormDataPre = z.infer<typeof contactFormSchema>;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [submissionId, setSubmissionId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const CONTACT_FORM_STORAGE_KEY = 'contact_form_submitted';


  useEffect(() => {
  if (typeof window === 'undefined') return;

  const submitted = localStorage.getItem(CONTACT_FORM_STORAGE_KEY);
  if (submitted === 'true') {
    setFormState('success');
  }
}, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactFormDataPre>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      client: {
        name: "",
        email: "",
       
        companyName: "",
      },
    //   projectDetails: {
    //     servicesInterested: [],
    //     budgetRange: "",
    //     timelinePreference: "",
    //   },
      message: {
        subject: "Site Mentanence Request",
        body: "",
      },
      preferences: {
        preferredContactMethod: "Email",
        newsletterOptIn: true,
        privacyConsent: true,
      },
    },
  });



  const onSubmit = async (data: ContactFormDataPre) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await submitContactForm(data);
      setSubmissionId(response.id || '');
      setFormState('success');
      localStorage.setItem(CONTACT_FORM_STORAGE_KEY, 'true');
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setFormState('error');
    }
  };

  const handleNewQuery = () => {
     localStorage.removeItem(CONTACT_FORM_STORAGE_KEY);
    setFormState('idle');
    setSubmissionId('');
    setErrorMessage('');
  };

  const renderFormContent = () => {
    switch (formState) {
      case 'success':
        return (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Message Sent Successfully!</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Thank you for your interest in Easy Dev! We&apos;ve received your message and will get back to you within 24 hours.
            </p>
            {submissionId && (
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-300">
                  Reference ID: <span className="font-mono font-semibold">{submissionId}</span>
                </p>
              </div>
            )}
            <button
              onClick={handleNewQuery}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Send New Query</span>
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Oops! Something went wrong</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={handleNewQuery}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Try Again</span>
            </button>
          </div>
        );

      default:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('client.name')}
                  type="text"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                    errors.client?.name 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : 'border-white/20 focus:ring-blue-400'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.client?.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.client.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('client.email')}
                  type="email"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                    errors.client?.email 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : 'border-white/20 focus:ring-blue-400'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.client?.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.client.email.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company (Optional)
              </label>
              <input
                {...register('client.companyName')}
                type="text"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tell us about your project *
              </label>
              <textarea
                {...register('message.body')}
                rows={5}
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                  errors.message?.body 
                    ? 'border-red-400 focus:ring-red-400/50' 
                    : 'border-white/20 focus:ring-blue-400'
                }`}
                placeholder="Describe your project or development needs..."
              />
              {errors.message?.body && (
                <p className="mt-2 text-sm text-red-400">{errors.message.body.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Join the Waitlist</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>
        );
    }
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Get Early Access</h2>
          <p className="text-gray-300 text-lg">
            Be the first to know when we launch and get exclusive early bird pricing
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {renderFormContent()}
        </div>
      </div>
    </section>
  );
};