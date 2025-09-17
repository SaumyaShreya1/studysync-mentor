import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Home,
  Plus,
  Eye,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react';

interface TeacherDashboardProps {
  teacherName: string;
  teacherId: string;
  onBack: () => void;
}

interface ClassType {
  id: string;
  name: string;
  students: number;
  avgProgress: number;
  subjects: string[];
  quizzes?: { name: string; questions: string[]; subject: string }[];
}

const initialClasses: ClassType[] = [
  { id: '6A', name: 'Class 6-A', students: 32, avgProgress: 67, subjects: ['Math','Science','English'] },
  { id: '7B', name: 'Class 7-B', students: 28, avgProgress: 73, subjects: ['Math','Science','English'] },
  { id: '8C', name: 'Class 8-C', students: 35, avgProgress: 61, subjects: ['Math','Science','English'] },
];

const recentActivities = [
  { student: 'Ram Kumar', class: '6A', activity: 'Completed Geography Quiz', score: '85%', time: '2 hours ago' },
  { student: 'Priya Singh', class: '7B', activity: 'Started Math Module', score: 'In Progress', time: '3 hours ago' },
  { student: 'Amit Patel', class: '8C', activity: 'Achieved Science Badge', score: '90%', time: '5 hours ago' },
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacherName, teacherId, onBack }) => {
  const [classes, setClasses] = useState<ClassType[]>(initialClasses);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const { toast } = useToast();

  // Quiz modal states
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [quizSubject, setQuizSubject] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleAddQuestion = () => {
    if (currentQuestion.trim() !== '') {
      setQuizQuestions([...quizQuestions, currentQuestion]);
      setCurrentQuestion('');
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedClass || !quizName || !quizSubject || quizQuestions.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and add at least 1 question.",
        variant: "destructive"
      });
      return;
    }

    const updatedClasses = classes.map((cls) =>
      cls.id === selectedClass
        ? {
            ...cls,
            quizzes: [...(cls.quizzes || []), { name: quizName, questions: quizQuestions, subject: quizSubject }],
          }
        : cls
    );

    setClasses(updatedClasses);
    setShowQuizModal(false);
    setQuizName('');
    setQuizSubject('');
    setQuizQuestions([]);
    
    toast({
      title: "Quiz Created Successfully!",
      description: `Quiz "${quizName}" has been assigned to ${classes.find(c => c.id === selectedClass)?.name} for ${quizSubject}.`
    });
  };

  // Quick Action Handlers
  const handleAssignQuiz = () => {
    if (!selectedClass) {
      toast({
        title: "No Class Selected",
        description: "Please select a class first to assign a quiz.",
        variant: "destructive"
      });
      return;
    }
    setShowQuizModal(true);
  };

  const handleViewReports = () => {
    if (!selectedClass) {
      toast({
        title: "No Class Selected", 
        description: "Please select a class first to view reports.",
        variant: "destructive"
      });
      return;
    }
    const selectedClassName = classes.find(c => c.id === selectedClass)?.name;
    toast({
      title: "Reports Loading",
      description: `Loading detailed reports for ${selectedClassName}...`
    });
  };

  const handleSchedule = () => {
    toast({
      title: "Schedule Feature",
      description: "Opening class schedule and calendar..."
    });
  };

  const handleMessages = () => {
    toast({
      title: "Messages",
      description: "Opening teacher-student messaging system..."
    });
  };

  const handleAddClass = () => {
    toast({
      title: "Add New Class",
      description: "Opening class creation form..."
    });
  };

  const handleViewClass = (className: string) => {
    toast({
      title: "Class Details",
      description: `Loading detailed view for ${className}...`
    });
  };

  const handleClassAnalytics = (className: string) => {
    toast({
      title: "Class Analytics",
      description: `Loading analytics dashboard for ${className}...`
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-dashboard-gradient text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/20">
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Teacher ID: {teacherId}
          </Badge>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, {teacherName}</h1>
          <p className="text-lg opacity-90">Teacher Dashboard - Monitor and Guide Student Progress</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-dashboard-blue"/>
              <div className="text-2xl font-bold text-dashboard-blue">95</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-dashboard-orange"/>
              <div className="text-2xl font-bold text-dashboard-orange">{classes.length}</div>
              <div className="text-sm text-muted-foreground">Active Classes</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-dashboard-green"/>
              <div className="text-2xl font-bold text-dashboard-green">67%</div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 mx-auto mb-2 text-dashboard-indigo"/>
              <div className="text-2xl font-bold text-dashboard-indigo">124</div>
              <div className="text-sm text-muted-foreground">Badges Awarded</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Classes */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Classes</h2>
              <Button size="sm" variant="dashboard-blue" onClick={handleAddClass}>
                <Plus className="w-4 h-4 mr-1"/> Add Class
              </Button>
            </div>
            <div className="space-y-4">
              {classes.map(cls => (
                <Card 
                  key={cls.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedClass === cls.id ? 'ring-2 ring-dashboard-orange' : ''
                  }`} 
                  onClick={() => setSelectedClass(cls.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <Badge variant="secondary">{cls.students} students</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Class Avg Progress</span>
                        <span className="font-medium">{cls.avgProgress}%</span>
                      </div>
                      <Progress value={cls.avgProgress} className="h-2"/>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{cls.subjects.length} subjects</span>
                      <div className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClass(cls.name);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1"/>View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClassAnalytics(cls.name);
                          }}
                        >
                          <BarChart3 className="w-4 h-4 mr-1"/>Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="dashboard-orange" className="h-12" onClick={handleAssignQuiz}>
                  <Plus className="w-4 h-4 mr-1"/> Assign Quiz
                </Button>
                <Button variant="dashboard-green" className="h-12" onClick={handleViewReports}>
                  <BarChart3 className="w-4 h-4 mr-1"/> View Reports
                </Button>
                <Button variant="dashboard-blue" className="h-12" onClick={handleSchedule}>
                  <Calendar className="w-4 h-4 mr-1"/> Schedule
                </Button>
                <Button variant="dashboard-indigo" className="h-12" onClick={handleMessages}>
                  <MessageSquare className="w-4 h-4 mr-1"/> Messages
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {recentActivities.map((act,i)=>(
                  <div key={i} className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">{act.student} <Badge variant="outline" className="ml-1">{act.class}</Badge></div>
                      <div className="text-xs text-muted-foreground mt-1">{act.activity}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-dashboard-green">{act.score}</div>
                      <div className="text-xs text-muted-foreground">{act.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-card p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Assign Quiz to {classes.find(c => c.id === selectedClass)?.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Quiz Name:</label>
                <Input 
                  type="text" 
                  value={quizName} 
                  onChange={e => setQuizName(e.target.value)} 
                  placeholder="Enter quiz name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Select Subject:</label>
                <Select value={quizSubject} onValueChange={setQuizSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.find(c => c.id === selectedClass)?.subjects.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Add Questions:</label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    type="text" 
                    value={currentQuestion} 
                    onChange={e => setCurrentQuestion(e.target.value)} 
                    placeholder="Enter a question"
                    className="flex-1"
                  />
                  <Button onClick={handleAddQuestion} size="sm">Add</Button>
                </div>
                {quizQuestions.length > 0 && (
                  <div className="bg-muted/50 p-3 rounded-md max-h-32 overflow-y-auto">
                    <p className="text-sm font-medium mb-2">Questions ({quizQuestions.length}):</p>
                    <ul className="space-y-1">
                      {quizQuestions.map((q, i) => (
                        <li key={i} className="text-sm">• {q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowQuizModal(false)}>Cancel</Button>
              <Button variant="dashboard-orange" onClick={handleSubmitQuiz}>Create Quiz</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;