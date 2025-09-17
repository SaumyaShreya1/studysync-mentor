import { useState } from "react";
import TeacherDashboard from "../components/TeacherDashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  
  const handleStartDemo = () => {
    setShowDashboard(true);
  };

  const handleBackToHome = () => {
    setShowDashboard(false);
  };

  if (showDashboard) {
    return (
      <TeacherDashboard 
        teacherName="Dr. Sarah Johnson"
        teacherId="TCH-2024-001"
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dashboard-gradient">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Teacher Dashboard Demo</h1>
        <p className="text-xl mb-8 opacity-90">Experience the complete teacher dashboard with working quiz assignment</p>
        <Button variant="secondary" size="lg" onClick={handleStartDemo}>
          Launch Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
