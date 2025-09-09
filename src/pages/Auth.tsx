import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement Firebase Authentication
    setTimeout(() => {
      toast({
        title: "Firebase Backend Ready",
        description: "Authentication can be implemented with Firebase Auth. Contact form is already using Firebase Firestore.",
        variant: "default",
      });
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement Firebase Authentication
    setTimeout(() => {
      toast({
        title: "Firebase Backend Ready",
        description: "Registration can be implemented with Firebase Auth. Contact form is already using Firebase Firestore.",
        variant: "default",
      });
      setIsLoading(false);
      setActiveTab("login");
    }, 1000);
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple mb-4">
              Account Access
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText text={activeTab === "login" ? "Login" : "Create Account"} once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                {activeTab === "login" 
                  ? "Welcome back! Login to access your account." 
                  : "Join our community by creating a new account."}
              </p>
            </div>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-panel p-8 rounded-lg">
                <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <label htmlFor="login-email" className="font-medium">Email</label>
                        </div>
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={loginData.email}
                          onChange={handleLoginChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <label htmlFor="login-password" className="font-medium">Password</label>
                        </div>
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-brand-purple hover:bg-brand-purple/90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <label htmlFor="signup-fullname" className="font-medium">Full Name</label>
                        </div>
                        <Input
                          id="signup-fullname"
                          name="fullName"
                          type="text"
                          placeholder="Your Name"
                          required
                          value={signupData.fullName}
                          onChange={handleSignupChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <label htmlFor="signup-email" className="font-medium">Email</label>
                        </div>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={signupData.email}
                          onChange={handleSignupChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <label htmlFor="signup-password" className="font-medium">Password</label>
                        </div>
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          value={signupData.password}
                          onChange={handleSignupChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-brand-purple hover:bg-brand-purple/90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
