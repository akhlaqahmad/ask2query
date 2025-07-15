import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Rahman",
    role: "Data Analyst",
    company: "Maybank",
    location: "Kuala Lumpur",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "Text2SQL.my has revolutionized how I work with data. The Bahasa Malaysia support is incredible - I can ask questions in my native language and get perfect SQL queries. Sangat membantu!",
    highlight: "Perfect Bahasa Malaysia support"
  },
  {
    name: "Siti Nurhaliza",
    role: "Software Developer",
    company: "Grab Malaysia",
    location: "Petaling Jaya",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "As a developer, this tool saves me hours every week. The generated SQL is always optimized and handles complex joins beautifully. Privacy-first approach gives me confidence.",
    highlight: "Saves hours every week"
  },
  {
    name: "Lim Wei Ming",
    role: "Business Owner",
    company: "Tech Startup",
    location: "Penang",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "Running a small business, I don't have budget for SQL experts. Text2SQL.my lets me analyze my data independently. The local Malaysian context makes it even better.",
    highlight: "Perfect for SMEs"
  },
  {
    name: "Raj Patel",
    role: "University Student",
    company: "Universiti Malaya",
    location: "Kuala Lumpur",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "Learning SQL has never been easier. I can see how my questions translate to actual SQL code. The tool is helping me ace my database course!",
    highlight: "Great for learning"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Malaysians
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See what our users across Malaysia are saying about Text2SQL.my
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <p className="text-xs text-slate-500">
                        📍 {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-300 italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg p-3 border border-blue-500/30">
                    <p className="text-sm text-blue-300 font-medium">
                      💡 {testimonial.highlight}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}