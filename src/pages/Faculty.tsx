
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Search, Filter, Calendar } from 'lucide-react';

interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  eventsCoordinated: number;
  image?: string;
}

const facultyData: FacultyMember[] = [
  {
    id: "F001",
    name: "Dr. Suresh Kumar",
    email: "suresh.k@vignan.ac.in",
    department: "Computer Science",
    role: "Professor",
    eventsCoordinated: 8,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "F002",
    name: "Dr. Anita Sharma",
    email: "anita.s@vignan.ac.in",
    department: "Electronics Engineering",
    role: "Associate Professor",
    eventsCoordinated: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop"
  },
  {
    id: "F003",
    name: "Prof. Rajesh Verma",
    email: "rajesh.v@vignan.ac.in",
    department: "Mechanical Engineering",
    role: "Assistant Professor",
    eventsCoordinated: 3,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "F004",
    name: "Dr. Priya Patel",
    email: "priya.p@vignan.ac.in",
    department: "Biotechnology",
    role: "Professor",
    eventsCoordinated: 6,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop"
  },
  {
    id: "F005",
    name: "Dr. Amit Singh",
    email: "amit.s@vignan.ac.in",
    department: "Civil Engineering",
    role: "Professor",
    eventsCoordinated: 4,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "F006",
    name: "Prof. Neha Gupta",
    email: "neha.g@vignan.ac.in",
    department: "Information Technology",
    role: "Assistant Professor",
    eventsCoordinated: 7,
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1470&auto=format&fit=crop"
  }
];

const Faculty = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaculty, setFilteredFaculty] = useState<FacultyMember[]>(facultyData);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    if (!isLoading && user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (searchTerm) {
      const results = facultyData.filter(faculty => 
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaculty(results);
    } else {
      setFilteredFaculty(facultyData);
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

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">Faculty Directory</h1>
      <p className="mb-8 text-gray-600">
        View and manage all faculty members involved in student activities.
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
          <Button>Add Faculty</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((faculty) => (
            <Card key={faculty.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="flex items-center p-6">
                <div className="w-16 h-16 mr-4 overflow-hidden rounded-full bg-gray-200">
                  {faculty.image ? (
                    <img 
                      src={faculty.image} 
                      alt={faculty.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{faculty.name}</h3>
                  <p className="text-sm text-gray-500">{faculty.email}</p>
                </div>
              </div>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="font-medium">{faculty.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium">{faculty.role}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Events Coordinated</p>
                    <div className="flex items-center">
                      <p className="font-medium">{faculty.eventsCoordinated}</p>
                      {faculty.eventsCoordinated > 6 && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Active Coordinator</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                  <Button size="sm" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 p-8 text-center">
            <User className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold">No Faculty Found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
