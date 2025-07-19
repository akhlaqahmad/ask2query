
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BLOG_CATEGORIES } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Eye, FileText } from 'lucide-react';

export function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'introductory',
    tags: '',
    author_name: 'Text2SQL Team',
    read_time_minutes: 5,
    is_published: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchPost(id);
    }
  }, [id, isEdit]);

  const fetchPost = async (postId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || 'introductory',
        tags: (data.tags || []).join(', '),
        author_name: data.author_name || 'Text2SQL Team',
        read_time_minutes: data.read_time_minutes || 5,
        is_published: data.is_published || false
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "Error",
        description: "Failed to fetch post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: prev.slug === '' ? generateSlug(value) : prev.slug
    }));
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      content: value,
      read_time_minutes: estimateReadTime(value)
    }));
  };

  const savePost = async (publishStatus: boolean) => {
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      toast({
        title: "Error",
        description: "Title and excerpt are required",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);

      const postData = {
        title: formData.title.trim(),
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        author_name: formData.author_name.trim(),
        read_time_minutes: formData.read_time_minutes,
        is_published: publishStatus,
        published_at: publishStatus ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      if (isEdit && id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Post ${publishStatus ? 'published' : 'saved as draft'} successfully`
      });

      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-700 rounded w-48"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-32 bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/posts')}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
        </Button>
        <h1 className="text-3xl font-bold text-white">
          {isEdit ? 'Edit Post' : 'New Post'}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title" className="text-slate-300">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="bg-slate-800/50 border-slate-700 text-white"
              placeholder="Enter post title..."
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-slate-300">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="bg-slate-800/50 border-slate-700 text-white"
              placeholder="auto-generated-from-title"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt" className="text-slate-300">Excerpt *</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            className="bg-slate-800/50 border-slate-700 text-white"
            placeholder="Brief description of the post..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="category" className="text-slate-300">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author" className="text-slate-300">Author</Label>
            <Input
              id="author"
              value={formData.author_name}
              onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="readTime" className="text-slate-300">Read Time (minutes)</Label>
            <Input
              id="readTime"
              type="number"
              min="1"
              value={formData.read_time_minutes}
              onChange={(e) => setFormData(prev => ({ ...prev, read_time_minutes: parseInt(e.target.value) || 1 }))}
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tags" className="text-slate-300">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            className="bg-slate-800/50 border-slate-700 text-white"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-slate-300">Content</Label>
          <Tabs defaultValue="write" className="mt-2">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="write" className="data-[state=active]:bg-slate-600">
                <FileText className="h-4 w-4 mr-2" />
                Write
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-slate-600">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-4">
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white min-h-[400px]"
                placeholder="Write your post content here... (Markdown supported)"
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-4">
              <div className="min-h-[400px] bg-slate-800/50 border border-slate-700 rounded-md p-4">
                {formData.content ? (
                  <MarkdownRenderer content={formData.content} />
                ) : (
                  <p className="text-slate-400 italic">No content to preview. Start writing in the Write tab.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <p className="text-sm text-slate-400 mt-2">
            Estimated read time: {formData.read_time_minutes} minutes | Supports Markdown formatting
          </p>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => savePost(false)}
            disabled={isSaving}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          
          <Button
            onClick={() => savePost(true)}
            disabled={isSaving}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Eye className="h-4 w-4 mr-2" />
            {isEdit ? 'Update & Publish' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
}
