import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CommitteeMember {
  name: string;
  position: string;
  department: string;
  year: string;
  image: string;
  email: string;
}

const committeeData: Record<string, CommitteeMember[]> = {
  executive: [
    {
      name: "Rahul Sharma",
      position: "President",
      department: "Computer Science",
      year: "Final Year",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop",
      email: "president@vignan.ac.in"
    },
    {
      name: "Priya Patel",
      position: "Vice President",
      department: "Electronics Engineering",
      year: "Final Year",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop",
      email: "vicepresident@vignan.ac.in"
    },
    {
      name: "Vikram Reddy",
      position: "General Secretary",
      department: "Mechanical Engineering",
      year: "Pre-Final Year",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop",
      email: "secretary@vignan.ac.in"
    },
    {
      name: "Anjali Singh",
      position: "Joint Secretary",
      department: "Biotechnology",
      year: "Pre-Final Year",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2564&auto=format&fit=crop",
      email: "jointsec@vignan.ac.in"
    },
    {
      name: "Arjun Kumar",
      position: "Treasurer",
      department: "Civil Engineering",
      year: "Final Year",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop",
      email: "treasurer@vignan.ac.in"
    }
  ],
  cultural: [
    {
      name: "Sneha Verma",
      position: "Cultural Secretary",
      department: "Arts & Humanities",
      year: "Third Year",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
      email: "cultural@vignan.ac.in"
    },
    {
      name: "Karan Kapoor",
      position: "Cultural Coordinator",
      department: "Fine Arts",
      year: "Third Year",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      email: "culturalcoord@vignan.ac.in"
    }
  ],
  technical: [
    {
      name: "Abhishek Gupta",
      position: "Technical Secretary",
      department: "Computer Science",
      year: "Final Year",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
      email: "technical@vignan.ac.in"
    },
    {
      name: "Neha Sharma",
      position: "Technical Coordinator",
      department: "Information Technology",
      year: "Third Year",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987&auto=format&fit=crop",
      email: "technicalcoord@vignan.ac.in"
    }
  ],
  sports: [
    {
      name: "Raj Malhotra",
      position: "Sports Secretary",
      department: "Physical Education",
      year: "Final Year",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop",
      email: "sports@vignan.ac.in"
    },
    {
      name: "Meera Desai",
      position: "Sports Coordinator",
      department: "Sports Science",
      year: "Third Year",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=989&auto=format&fit=crop",
      email: "sportscoord@vignan.ac.in"
    }
  ]
};

const Committee = () => {
  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-2 text-4xl font-bold text-center">Student Activity Council</h1>
      <p className="mb-10 text-center text-gray-600 max-w-2xl mx-auto">
        Meet our dedicated team of student leaders working tirelessly to enhance campus life and student experiences at Vignan University.
      </p>

      {/* Executive Committee */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-center">Executive Committee</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {committeeData.executive.map((member, index) => (
            <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium text-base">
                  {member.position}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Department:</span> {member.department}</p>
                  <p><span className="font-medium">Year:</span> {member.year}</p>
                  <p><span className="font-medium">Email:</span> {member.email}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Committees */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-center">Department Secretaries</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(committeeData)
            .filter(([key]) => key !== 'executive')
            .flatMap(([_, members]) => members)
            .map((member, index) => (
              <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.position}</p>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Organization Chart */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-center">Organization Structure</h2>
        <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-3xl">
          <div className="p-6">
            <div className="space-y-8">
              {/* President */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2 overflow-hidden rounded-full border-4 border-primary">
                  <img 
                    src={committeeData.executive[0].image} 
                    alt={committeeData.executive[0].name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{committeeData.executive[0].name}</h3>
                  <p className="text-primary font-medium">{committeeData.executive[0].position}</p>
                </div>
              </div>
              
              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gray-300"></div>
              </div>
              
              {/* Vice President */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-2 overflow-hidden rounded-full border-4 border-primary-light">
                  <img 
                    src={committeeData.executive[1].image} 
                    alt={committeeData.executive[1].name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{committeeData.executive[1].name}</h3>
                  <p className="text-primary font-medium">{committeeData.executive[1].position}</p>
                </div>
              </div>
              
              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gray-300"></div>
              </div>
              
              {/* Secretary Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {committeeData.executive.slice(2, 5).map((member, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-2 overflow-hidden rounded-full border-2 border-primary-light">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-primary text-sm">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Committee;
