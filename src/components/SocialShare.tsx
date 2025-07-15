import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Twitter, Linkedin, Link, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  query: string;
  sql: string;
  results?: Record<string, unknown>;
}

export function SocialShare({ query, sql, results }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareText = `🚀 Just generated SQL with Text2SQL!\n\n"${query}"\n\n✨ AI converted it to perfect SQL instantly!\n\nTry it yourself:`;
  const shareUrl = 'https://text2sql.my'; // Update with actual domain

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Share link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(`${shareText} ${shareUrl} #Text2SQL #AI #DataAnalysis`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const linkedInText = encodeURIComponent(shareText);
    const linkedInUrl = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${linkedInUrl}&summary=${linkedInText}`, '_blank');
  };

  const copyQueryAndSQL = async () => {
    const textToCopy = `Natural Language Query: "${query}"\n\nGenerated SQL:\n${sql}\n\nGenerated with Text2SQL - ${shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Query Copied!",
        description: "Query and SQL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!query || !sql) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Share2 className="h-5 w-5 text-purple-400" />
            Share Your Query
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
                  Text2SQL Generated
                </Badge>
                {results && (
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    {typeof results === 'object' && results !== null && 'rowCount' in results && typeof (results as Record<string, unknown>).rowCount === 'number' ? (results as Record<string, unknown>).rowCount as number : 0} rows
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-slate-400">Natural Language Query:</h4>
                  <p className="text-white italic">"{query}"</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-400">Generated SQL:</h4>
                  <code className="block bg-slate-900 p-2 rounded text-sm text-green-300 font-mono">
                    {sql.length > 100 ? `${sql.substring(0, 100)}...` : sql}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Buttons */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Share on Social Media</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={handleTwitterShare}
                className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white justify-start"
              >
                <Twitter className="h-4 w-4 mr-3" />
                Share on Twitter
              </Button>
              
              <Button
                onClick={handleLinkedInShare}
                className="bg-[#0077B5] hover:bg-[#005582] text-white justify-start"
              >
                <Linkedin className="h-4 w-4 mr-3" />
                Share on LinkedIn
              </Button>
            </div>
          </div>

          {/* Copy Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Copy & Share</h3>
            <div className="space-y-3">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full bg-slate-800 border-slate-600 text-white hover:bg-slate-700 justify-start"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-3 text-green-400" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4 mr-3" />
                    Copy Share Link
                  </>
                )}
              </Button>
              
              <Button
                onClick={copyQueryAndSQL}
                variant="outline"
                className="w-full bg-slate-800 border-slate-600 text-white hover:bg-slate-700 justify-start"
              >
                <Copy className="h-4 w-4 mr-3" />
                Copy Query & SQL
              </Button>
            </div>
          </div>

          {/* Share Stats */}
          <div className="text-center text-sm text-slate-400 p-4 bg-slate-800/50 rounded-lg">
            <p>💡 <strong>Tip:</strong> Sharing helps others discover the power of AI-generated SQL!</p>
            <p className="mt-1">Your query data is never stored on our servers.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}