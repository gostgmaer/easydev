import {
  MessageCircle,
  Mail,
  Calendar,
  Globe,
} from "lucide-react";
import { CONTACT_INFO } from "../../../data/contact";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
        </div>
        <div className="space-y-6">
          {CONTACT_INFO.map((info, index) => (
            <div key={index} className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                <info.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{info.title}</h4>
                <a
                  href={info.href}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors break-words"
                >
                  {info.value}
                </a>
                <p className="text-sm text-gray-600 mt-1">{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <a
            href="mailto:hello@developer.com"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </a>
          <a
            href="https://calendly.com/developer-schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Call
          </a>
          <a
            href="https://wa.me/+918637317273"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </a>
          <a
            href="/portfolio.pdf"
            download
            className="w-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Globe className="w-4 h-4 mr-2" />
            Download Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}