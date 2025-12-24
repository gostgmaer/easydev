import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Users, Zap, Target, TrendingUp } from 'lucide-react';
import { siteContent } from '@/lib/content';

export default function About() {
  const skills = siteContent.about.skills;
  const achievements = siteContent.about.achievements.map(achievement => ({
    icon: CheckCircle,
    title: achievement.title,
    desc: achievement.desc
  }));

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            About Our Agency
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {siteContent.about.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Journey</h3>
            <div className="space-y-8">
              {siteContent.about.journey.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Technical Expertise</h3>
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
            
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <achievement.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Growth Story</h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {siteContent.about.experience.map((exp, index) => (
                <div key={index} className="flex flex-col md:flex-row">
                  <div className="flex-shrink-0 md:w-40 text-left md:text-right md:pr-8 mb-4 md:mb-0">
                    <span className="text-blue-600 font-bold text-lg">{exp.period}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-200"></div>
                    <div className="pl-10">
                      <h4 className="font-bold text-gray-900 text-xl mb-1">{exp.role}</h4>
                      <p className="text-blue-600 font-medium mb-3 text-lg">{exp.company}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
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
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Our Impact in Numbers</h3>
            <p className="text-blue-100 text-lg">Measurable results that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">80+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Achieved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}