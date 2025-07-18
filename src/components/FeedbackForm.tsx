
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Star, Bug, Lightbulb, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';

const FEEDBACK_TYPES = [
  { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-400' },
  { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-400' },
  { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-blue-400' },
  { id: 'praise', label: 'Praise', icon: Heart, color: 'text-pink-400' }
] as const;

type FeedbackType = typeof FEEDBACK_TYPES[number]['id'];

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>('general');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { submitFeedback, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please provide feedback before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await submitFeedback({
        type,
        rating: rating > 0 ? rating : undefined,
        email: email.trim() || undefined,
        message: message.trim(),
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it shortly.",
      });
      
      // Reset form
      setType('general');
      setRating(0);
      setEmail('');
      setMessage('');
      setIsOpen(false);
      
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact support directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = FEEDBACK_TYPES.find(t => t.id === type);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            Share Your Feedback
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type */}
          <div className="space-y-3">
            <Label className="text-white font-medium">What type of feedback do you have?</Label>
            <RadioGroup value={type} onValueChange={(value: FeedbackType) => setType(value)}>
              <div className="grid grid-cols-2 gap-3">
                {FEEDBACK_TYPES.map((feedbackType) => (
                  <div key={feedbackType.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={feedbackType.id} id={feedbackType.id} />
                    <Label 
                      htmlFor={feedbackType.id} 
                      className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
                    >
                      <feedbackType.icon className={`h-4 w-4 ${feedbackType.color}`} />
                      {feedbackType.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-white font-medium">How would you rate your experience?</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-300">
                {rating} out of 5 stars
              </Badge>
            )}
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">
              Email {user ? '(optional)' : '(optional - for follow-up)'}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user?.email || "your.email@example.com"}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
            <p className="text-xs text-slate-400">
              {user 
                ? "Leave blank to use your account email for follow-up" 
                : "Only if you'd like us to follow up on your feedback"
              }
            </p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white font-medium">
              Your Feedback *
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Share your ${selectedType?.label.toLowerCase() || 'feedback'}...`}
              className="min-h-32 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              required
            />
            <p className="text-xs text-slate-400">
              Please be specific and include any relevant details
            </p>
          </div>

          {/* Tips Card */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-purple-300">💡 Tips for great feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-400">
              <p>• <strong>Bug reports:</strong> Include steps to reproduce the issue</p>
              <p>• <strong>Feature requests:</strong> Explain how it would help your workflow</p>
              <p>• <strong>General feedback:</strong> Be specific about what works or doesn't</p>
              <p>• <strong>Praise:</strong> Tell us what you love most about Text2SQL!</p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col gap-3">
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400">
                You can also reach us directly at{' '}
                <a href="mailto:to@text2sql.my" className="text-purple-400 hover:text-purple-300 underline">
                  to@text2sql.my
                </a>
              </p>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
