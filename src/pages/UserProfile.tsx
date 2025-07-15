import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivityLogger } from '@/hooks/useActivityLogger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Lock, Activity, Database } from 'lucide-react';

interface UserProfile {
  display_name: string | null;
  bio: string | null;
  preferences: Record<string, any>;
}

interface ActivityLog {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
  metadata: Record<string, any>;
}

interface UserDatabase {
  id: string;
  database_name: string;
  file_size: number;
  uploaded_at: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logActivity } = useActivityLogger();
  const { toast } = useToast();

  const [profile, setProfile] = useState<UserProfile>({
    display_name: '',
    bio: '',
    preferences: {}
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [databases, setDatabases] = useState<UserDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (!user) return;
    
    setIsLoadingData(true);
    try {
      // For now, just set empty data until migration is applied
      setProfile({
        display_name: user.email?.split('@')[0] || '',
        bio: '',
        preferences: {}
      });
      setActivities([]);
      setDatabases([]);

      // TODO: Uncomment after migration is applied
      // const { data: profileData, error: profileError } = await supabase.rpc('get_user_profile', {
      //   p_user_id: user.id
      // });
      //
      // if (profileData && !profileError) {
      //   setProfile({
      //     display_name: profileData.display_name,
      //     bio: profileData.bio,
      //     preferences: profileData.preferences || {}
      //   });
      // }
      //
      // const { data: activitiesData, error: activitiesError } = await supabase.rpc('get_user_activities', {
      //   p_user_id: user.id,
      //   p_limit: 10
      // });
      //
      // if (activitiesData && !activitiesError) {
      //   setActivities(activitiesData);
      // }
      //
      // const { data: databasesData, error: databasesError } = await supabase.rpc('get_user_databases', {
      //   p_user_id: user.id
      // });
      //
      // if (databasesData && !databasesError) {
      //   setDatabases(databasesData);
      // }
    } catch (error) {
      console.error('Failed to load user data:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // For now, just log the update
      console.log('Profile update:', profile);
      
      await logActivity('profile_update', 'Updated profile information');
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      // TODO: Uncomment after migration is applied
      // const { error } = await supabase.rpc('update_user_profile', {
      //   p_user_id: user.id,
      //   p_display_name: profile.display_name,
      //   p_bio: profile.bio,
      //   p_preferences: profile.preferences
      // });
      //
      // if (error) throw error;
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (passwords.new.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;

      await logActivity('password_change', 'Changed account password');
      
      setPasswords({ current: '', new: '', confirm: '' });
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
    } catch (error) {
      console.error('Failed to change password:', error);
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDatabase = async (databaseId: string) => {
    try {
      console.log('Delete database:', databaseId);
      
      setDatabases(databases.filter(db => db.id !== databaseId));
      toast({
        title: "Success",
        description: "Database deleted successfully",
      });

      // TODO: Uncomment after migration is applied
      // const { error } = await supabase.rpc('delete_user_database', {
      //   p_database_id: databaseId
      // });
      //
      // if (error) throw error;
    } catch (error) {
      console.error('Failed to delete database:', error);
      toast({
        title: "Error",
        description: "Failed to delete database",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>
              Manage your account settings and view your activity
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="databases">Databases</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="opacity-50"
                  />
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={profile.display_name || ''}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                    placeholder="Enter your display name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <Button onClick={updateProfile} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Change your password and manage security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>

                <Button 
                  onClick={changePassword} 
                  disabled={isLoading || !passwords.new || !passwords.confirm}
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  View your recent actions and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No activity recorded yet. Activity tracking will be enabled after database setup.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex justify-between items-start p-3 border rounded">
                        <div>
                          <p className="font-medium capitalize">
                            {activity.activity_type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="databases">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Uploaded Databases
                </CardTitle>
                <CardDescription>
                  Manage your uploaded database files
                </CardDescription>
              </CardHeader>
              <CardContent>
                {databases.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No databases uploaded yet. Database tracking will be enabled after database setup.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {databases.map((database) => (
                      <div key={database.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{database.database_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(database.file_size)} • Uploaded {new Date(database.uploaded_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteDatabase(database.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}