
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Users, Bell, MessageSquare, CheckCircle, Award, Activity } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

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

  if (!user) return null;

  const renderStudentDashboard = () => (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Registered Activities</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 unread</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="activities">
        <TabsList className="mb-6">
          <TabsTrigger value="activities">My Activities</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Activities</CardTitle>
              <CardDescription>Activities and events you've registered for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Technical Paper Presentation", date: "October 15, 2023", status: "Registered" },
                  { name: "Dance Competition", date: "October 20, 2023", status: "Registered" },
                  { name: "Winter Tech Fest", date: "December 8-10, 2023", status: "Pending Approval" },
                  { name: "Leadership Workshop Series", date: "September 5, 2023", status: "Completed" },
                  { name: "Annual Cultural Fest", date: "March 15, 2023", status: "Completed" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{activity.name}</h4>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        activity.status === "Registered" ? "bg-blue-100 text-blue-800" :
                        activity.status === "Pending Approval" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with the latest information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "New Event Registration Open", message: "Technical Paper Presentation registration is now open.", time: "2 hours ago", unread: true },
                  { title: "Event Reminder", message: "Dance Competition is scheduled for tomorrow.", time: "1 day ago", unread: true },
                  { title: "Certificate Available", message: "Your certificate for Leadership Workshop is ready to download.", time: "3 days ago", unread: true },
                  { title: "Registration Confirmed", message: "Your registration for Winter Tech Fest is confirmed.", time: "1 week ago", unread: false },
                  { title: "Upcoming Event", message: "Don't miss the Annual Sports Meet next month!", time: "2 weeks ago", unread: false }
                ].map((notification, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${notification.unread ? "bg-blue-50" : ""}`}>
                    <div className="flex justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      {notification.unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderFacultyDashboard = () => (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Under supervision</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Events Coordinated</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Student Complaints</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Unresolved issues</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="attendance">
        <TabsList className="mb-6">
          <TabsTrigger value="attendance">Attendance Management</TabsTrigger>
          <TabsTrigger value="complaints">Student Complaints</TabsTrigger>
          <TabsTrigger value="events">Events Coordination</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance Sessions</CardTitle>
              <CardDescription>Monitor and manage attendance for recent activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { event: "Technical Paper Presentation", date: "October 15, 2023", attendees: 42, total: 50 },
                  { event: "Leadership Workshop", date: "September 5, 2023", attendees: 35, total: 40 },
                  { event: "Cultural Fest - Day 1", date: "April 15, 2023", attendees: 120, total: 150 }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{session.event}</h4>
                      <p className="text-sm text-gray-500">{session.date}</p>
                    </div>
                    <div>
                      <div className="text-right">
                        <span className="font-medium">{session.attendees}/{session.total}</span>
                      </div>
                      <div className="w-24 h-2 mt-1 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${(session.attendees/session.total)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button>Manage Attendance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="complaints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Complaints</CardTitle>
              <CardDescription>Review and address student issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Event Registration Issue", 
                    student: "Aryan Patel", 
                    date: "October 3, 2023", 
                    status: "Pending",
                    message: "Unable to register for Technical Paper Presentation despite meeting criteria."
                  },
                  { 
                    title: "Certificate Error", 
                    student: "Priya Singh", 
                    date: "September 28, 2023", 
                    status: "In Progress",
                    message: "My name is misspelled on the Leadership Workshop certificate."
                  },
                  { 
                    title: "Event Scheduling Conflict", 
                    student: "Raj Kumar", 
                    date: "September 15, 2023", 
                    status: "Resolved",
                    message: "Two events I'm participating in are scheduled at the same time."
                  }
                ].map((complaint, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{complaint.title}</h4>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        complaint.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        complaint.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{complaint.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">From: {complaint.student}</p>
                      <p className="text-xs text-gray-500">{complaint.date}</p>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      {complaint.status !== "Resolved" && (
                        <Button size="sm">Respond</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coordinated Events</CardTitle>
              <CardDescription>Events you're responsible for coordinating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    name: "Technical Paper Presentation", 
                    date: "October 15, 2023", 
                    registrations: 42, 
                    status: "Upcoming",
                    budget: "₹15,000"
                  },
                  { 
                    name: "Leadership Workshop Series", 
                    date: "September 5, 2023", 
                    registrations: 35, 
                    status: "Completed",
                    budget: "₹8,000"
                  },
                  { 
                    name: "Inter-Department Coding Challenge", 
                    date: "November 12, 2023", 
                    registrations: 28, 
                    status: "Planning",
                    budget: "₹12,000"
                  }
                ].map((event, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{event.name}</h4>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        event.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                        event.status === "Planning" ? "bg-purple-100 text-purple-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-gray-500">Date: <span className="text-gray-700">{event.date}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-500">Registrations: <span className="text-gray-700">{event.registrations}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-500">Budget: <span className="text-gray-700">{event.budget}</span></p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button size="sm">Manage Event</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+57 from last semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <User className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76</div>
            <p className="text-xs text-muted-foreground">+3 from last semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Current academic year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="events">Events Overview</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage students, faculty, and administrative accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Button variant="outline">Add New User</Button>
                <Button variant="outline">Export Data</Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Aryan Patel", email: "aryan.p@vignan.ac.in", role: "Student", department: "Computer Science" },
                      { name: "Dr. Suresh Kumar", email: "suresh.k@vignan.ac.in", role: "Faculty", department: "Electronics Engineering" },
                      { name: "Priya Singh", email: "priya.s@vignan.ac.in", role: "Student", department: "Biotechnology" },
                      { name: "Dr. Anita Sharma", email: "anita.s@vignan.ac.in", role: "Faculty", department: "Mathematics" },
                      { name: "Raj Malhotra", email: "raj.m@vignan.ac.in", role: "Admin", department: "Administration" }
                    ].map((user, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === "Student" ? "bg-blue-100 text-blue-800" :
                            user.role === "Faculty" ? "bg-green-100 text-green-800" :
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">{user.department}</td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Showing 5 of 1,321 users</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Events Overview</CardTitle>
              <CardDescription>Monitor all campus events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Annual Cultural Festival", coordinator: "Sneha Verma", date: "April 15-17, 2023", status: "Completed", budget: "₹2,50,000", participants: 850 },
                  { name: "Tech Innovate Summit", coordinator: "Abhishek Gupta", date: "May 10-11, 2023", status: "Completed", budget: "₹1,75,000", participants: 420 },
                  { name: "Dance Competition", coordinator: "Karan Kapoor", date: "October 20, 2023", status: "Upcoming", budget: "₹45,000", participants: 120 },
                  { name: "Winter Tech Fest", coordinator: "Abhishek Gupta", date: "December 8-10, 2023", status: "Planning", budget: "₹2,00,000", participants: 0 }
                ].map((event, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{event.name}</h4>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        event.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                        event.status === "Planning" ? "bg-purple-100 text-purple-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-gray-500">Date: <span className="text-gray-700">{event.date}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-500">Coordinator: <span className="text-gray-700">{event.coordinator}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-500">Budget: <span className="text-gray-700">{event.budget}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-500">Participants: <span className="text-gray-700">{event.participants}</span></p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button>Create New Event</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Review and approve requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    type: "Event Creation", 
                    requester: "Dr. Anita Sharma", 
                    title: "Research Symposium", 
                    date: "October 5, 2023",
                    details: "Budget: ₹75,000 | Expected Participants: 200"
                  },
                  { 
                    type: "Budget Increase", 
                    requester: "Karan Kapoor", 
                    title: "Dance Competition", 
                    date: "October 2, 2023",
                    details: "Increase from ₹45,000 to ₹60,000 due to venue change"
                  },
                  { 
                    type: "Faculty Access", 
                    requester: "Dr. Ramesh Joshi", 
                    title: "System Access Request", 
                    date: "September 28, 2023",
                    details: "Request for approval to manage technical events"
                  }
                ].map((approval, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{approval.title}</h4>
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        {approval.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{approval.details}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">From: {approval.requester}</p>
                      <p className="text-xs text-gray-500">Submitted: {approval.date}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );

  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-600">{user.role === 'admin' ? 'Administrator Dashboard' : user.role === 'faculty' ? 'Faculty Dashboard' : 'Student Dashboard'}</p>
      </div>
      
      {user.role === 'student' && renderStudentDashboard()}
      {user.role === 'faculty' && renderFacultyDashboard()}
      {user.role === 'admin' && renderAdminDashboard()}
    </div>
  );
};

export default Dashboard;
