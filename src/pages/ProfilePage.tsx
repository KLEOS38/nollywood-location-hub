
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserProfile from '@/components/profile/UserProfile';
import GuestDashboard from '@/components/dashboard/GuestDashboard';
import HostDashboard from '@/components/dashboard/HostDashboard';
import { User, Home, Settings } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-6">
              {/* Show different dashboards based on user type */}
              <GuestDashboard />
              <div className="mt-8">
                <HostDashboard />
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="mt-6">
              <UserProfile 
                isEditing={isEditingProfile}
                onEditToggle={() => setIsEditingProfile(!isEditingProfile)}
              />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Account Settings</h2>
                <p className="text-muted-foreground">
                  Account settings and preferences will be added here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
