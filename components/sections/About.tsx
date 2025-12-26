import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';
import { siteContent } from '@/lib/content';

export default function About() {
  const skills = siteContent.about.skills;
  const achievements = siteContent.about.achievements.map(achievement => ({
    icon: CheckCircle,
    title: achievement.title,
    desc: achievement.desc
  }));

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {siteContent.about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Journey
            </h3>
            <div className="space-y-6">
              {siteContent.about.journey.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4 text-center">
                    <achievement.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">{achievement.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Experience</h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {siteContent.about.experience.map((exp, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-32 text-right pr-8">
                    <span className="text-blue-600 font-semibold">{exp.period}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                    <div className="pl-8">
                      <h4 className="font-bold text-gray-900">{exp.role}</h4>
                      <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}