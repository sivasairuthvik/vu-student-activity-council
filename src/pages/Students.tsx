
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Search, Filter } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  eventsRegistered: number;
  image?: string;
}

const studentsData: Student[] = [
  {
    id: "ST001",
    name: "Aryan Patel",
    email: "aryan.p@vignan.ac.in",
    department: "Computer Science",
    year: "3rd Year",
    eventsRegistered: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: "ST002",
    name: "Priya Singh",
    email: "priya.s@vignan.ac.in",
    department: "Biotechnology",
    year: "4th Year",
    eventsRegistered: 3,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: "ST003",
    name: "Rohit Kumar",
    email: "rohit.k@vignan.ac.in",
    department: "Electronics Engineering",
    year: "2nd Year",
    eventsRegistered: 2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: "ST004",
    name: "Ananya Sharma",
    email: "ananya.s@vignan.ac.in",
    department: "Mechanical Engineering",
    year: "3rd Year",
    eventsRegistered: 4,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: "ST005",
    name: "Vikram Reddy",
    email: "vikram.r@vignan.ac.in",
    department: "Civil Engineering",
    year: "4th Year",
    eventsRegistered: 6,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "ST006",
    name: "Sneha Verma",
    email: "sneha.v@vignan.ac.in",
    department: "Computer Science",
    year: "3rd Year",
    eventsRegistered: 7,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: "ST007",
    name: "Rajesh Sharma",
    email: "rajesh.s@vignan.ac.in",
    department: "Information Technology",
    year: "2nd Year",
    eventsRegistered: 1,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop"
  },
  {
    id: "ST008",
    name: "Meera Desai",
    email: "meera.d@vignan.ac.in",
    department: "Electronics Engineering",
    year: "4th Year",
    eventsRegistered: 3,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop"
  }
];

const Students = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(studentsData);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    if (!isLoading && user && user.role === 'student') {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (searchTerm) {
      const results = studentsData.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(results);
    } else {
      setFilteredStudents(studentsData);
    }
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto animate-spin text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) return null;

  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">Students Directory</h1>
      <p className="mb-8 text-gray-600">
        {user.role === 'admin' ? 
          'View and manage all students registered in the system.' : 
          'View and manage students under your supervision.'}
      </p>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search by name, email, or department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          {user.role === 'admin' && (
            <Button>Add Student</Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Card key={student.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="flex items-center p-6">
                <div className="w-16 h-16 mr-4 overflow-hidden rounded-full bg-gray-200">
                  {student.image ? (
                    <img 
                      src={student.image} 
                      alt={student.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="font-medium">{student.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Year</p>
                    <p className="font-medium">{student.year}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Events Registered</p>
                    <div className="flex items-center">
                      <p className="font-medium">{student.eventsRegistered}</p>
                      {student.eventsRegistered > 5 && (
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button variant="outline" size="sm">Events History</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 p-8 text-center">
            <User className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold">No Students Found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
