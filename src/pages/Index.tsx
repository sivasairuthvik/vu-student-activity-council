
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary-light via-primary to-primary-dark text-white">
        <div className="container px-4 py-20 mx-auto text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6 animate-fade-in">
            Vignan University Student Activity Council
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg animate-fade-in">
            Empowering students through leadership, events, and community engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-in">
            <Button asChild size="lg">
              <Link to="/events">
                <Calendar className="w-5 h-5 mr-2" />
                Explore Events
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/committee">
                <Users className="w-5 h-5 mr-2" />
                Meet Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">What We Do</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Calendar className="w-12 h-12 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Campus Events</h3>
            <p className="text-gray-600">
              Organizing cultural, technical, and sports events throughout the academic year.
            </p>
          </div>
          
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Student Engagement</h3>
            <p className="text-gray-600">
              Creating opportunities for students to develop leadership and organizational skills.
            </p>
          </div>
          
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Recognition</h3>
            <p className="text-gray-600">
              Honoring student achievements and contributions to campus life.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Recent Events</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Annual Cultural Fest",
                date: "March 15, 2023",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
                description: "A vibrant celebration of art, music, and dance from various cultures."
              },
              {
                title: "Tech Summit 2023",
                date: "February 5, 2023",
                image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
                description: "Showcasing innovative projects and technological advancements by students."
              },
              {
                title: "Sports Tournament",
                date: "January 20, 2023",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
                description: "Inter-departmental competitions promoting sportsmanship and physical fitness."
              }
            ].map((event, index) => (
              <div key={index} className="overflow-hidden bg-white rounded-lg shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{event.title}</h3>
                  <p className="mb-3 text-sm text-gray-500">{event.date}</p>
                  <p className="mb-4 text-gray-600">{event.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/events">Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container px-4 py-16 mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold">Join Our Community</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
          Become a part of Vignan University's vibrant student community and make your college experience memorable.
        </p>
        <Button asChild size="lg">
          <Link to="/login">Get Started</Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
