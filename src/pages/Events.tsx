
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  category: 'cultural' | 'technical' | 'sports' | 'workshop';
  image: string;
  coordinator: string;
  status: 'upcoming' | 'completed';
}

const eventsData: Event[] = [
  {
    id: "1",
    title: "Annual Cultural Festival",
    date: "April 15-17, 2023",
    venue: "University Main Auditorium",
    description: "A three-day extravaganza celebrating art, music, dance and cultural diversity. Join us for performances, competitions, and festivities.",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Sneha Verma, Cultural Secretary",
    status: "completed"
  },
  {
    id: "2",
    title: "Tech Innovate Summit",
    date: "May 10-11, 2023",
    venue: "Engineering Block Conference Hall",
    description: "A technical symposium featuring project exhibitions, hackathons, coding competitions, and expert talks on emerging technologies.",
    category: "technical",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Abhishek Gupta, Technical Secretary",
    status: "completed"
  },
  {
    id: "3",
    title: "Inter-Department Sports Tournament",
    date: "June 5-15, 2023",
    venue: "University Sports Complex",
    description: "Annual sports competition featuring cricket, football, basketball, volleyball, athletics, and more between different departments.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Raj Malhotra, Sports Secretary",
    status: "completed"
  },
  {
    id: "4",
    title: "Campus Hackathon",
    date: "August 12-13, 2023",
    venue: "IT Lab Complex",
    description: "24-hour coding challenge where participants solve real-world problems through innovative software solutions.",
    category: "technical",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Neha Sharma, Technical Coordinator",
    status: "completed"
  },
  {
    id: "5",
    title: "Leadership Workshop Series",
    date: "September 5, 2023",
    venue: "Management Block Seminar Hall",
    description: "Interactive workshop aimed at developing leadership, communication, and organizational skills in students.",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Vikram Reddy, General Secretary",
    status: "completed"
  },
  {
    id: "6",
    title: "Dance Competition",
    date: "October 20, 2023",
    venue: "University Amphitheater",
    description: "Annual dance competition showcasing various dance forms including classical, contemporary, folk, and western.",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Karan Kapoor, Cultural Coordinator",
    status: "upcoming"
  },
  {
    id: "7",
    title: "Winter Tech Fest",
    date: "December 8-10, 2023",
    venue: "Engineering Block",
    description: "End-of-year technical festival featuring robotics competitions, technical paper presentations, and project exhibitions.",
    category: "technical",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Abhishek Gupta, Technical Secretary",
    status: "upcoming"
  },
  {
    id: "8",
    title: "New Year Sports Meet",
    date: "January 15-20, 2024",
    venue: "University Sports Complex",
    description: "Start the new year with exciting sports competitions between different departments and colleges.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
    coordinator: "Meera Desai, Sports Coordinator",
    status: "upcoming"
  }
];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeStatus, setActiveStatus] = useState<string>("all");

  const filteredEvents = eventsData.filter(event => {
    if (activeCategory !== "all" && event.category !== activeCategory) return false;
    if (activeStatus !== "all" && event.status !== activeStatus) return false;
    return true;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'bg-pink-100 text-pink-800';
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-2 text-4xl font-bold text-center">Events</h1>
      <p className="mb-10 text-center text-gray-600 max-w-2xl mx-auto">
        Discover a wide range of activities and events organized by the Student Activity Council throughout the academic year.
      </p>

      <Tabs defaultValue="all" className="mb-10">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setActiveStatus("all")}>All</TabsTrigger>
            <TabsTrigger value="upcoming" onClick={() => setActiveStatus("upcoming")}>Upcoming</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setActiveStatus("completed")}>Past Events</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              className={`cursor-pointer ${activeCategory === 'all' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary/20 hover:bg-secondary/30 text-primary'}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeCategory === 'cultural' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary/20 hover:bg-secondary/30 text-primary'}`}
              onClick={() => setActiveCategory('cultural')}
            >
              Cultural
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeCategory === 'technical' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary/20 hover:bg-secondary/30 text-primary'}`}
              onClick={() => setActiveCategory('technical')}
            >
              Technical
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeCategory === 'sports' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary/20 hover:bg-secondary/30 text-primary'}`}
              onClick={() => setActiveCategory('sports')}
            >
              Sports
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeCategory === 'workshop' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary/20 hover:bg-secondary/30 text-primary'}`}
              onClick={() => setActiveCategory('workshop')}
            >
              Workshops
            </Badge>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                      <Badge variant={event.status === 'upcoming' ? 'default' : 'outline'}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{event.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{event.description}</p>
                    <p className="mt-2 text-sm"><strong>Venue:</strong> {event.venue}</p>
                    <p className="flex items-center mt-2 text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.coordinator}</span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold">No events found</h3>
              <p className="text-gray-500">Try changing your filter criteria</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          {/* Content is managed by the filter state */}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {/* Content is managed by the filter state */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
