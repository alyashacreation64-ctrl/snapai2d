import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { SEO, BASE_URL } from '@/components/SEO';
import { BLOG_POSTS } from '@/data/blogPosts';
import { ScreenshotUploader } from '@/components/ScreenshotUploader';

export function BlogListPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Snap2Do AI Blog',
    url: `${BASE_URL}/blog`,
    description: 'Tips, guides, and insights on using AI to turn screenshots into actionable tasks.',
  };

  return (
    <>
      <SEO
        title="Blog — Snap2Do AI | AI Screenshot Tips & Productivity Guides"
        description="Learn how to use AI to turn screenshots into tasks, extract deadlines, boost contractor productivity, and more. Practical guides from the Snap2Do AI blog."
        canonical={`${BASE_URL}/blog`}
        keywords={['AI screenshot analyzer blog', 'screenshot to task guide', 'AI productivity tips', 'contractor AI tools blog']}
        structuredData={structuredData}
      />

      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Snap2Do AI Blog</h1>
          <p className="text-lg text-secondary mb-12 max-w-2xl">
            Practical guides on using AI to turn screenshots into tasks, extract deadlines,
            and boost your productivity.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="card overflow-hidden hover:border-accent-500/30 transition-all duration-300 group"
              >
                <div className="aspect-video bg-tertiary relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-20">
                      {post.category === 'Contractors' ? '🔧' : post.category === 'Tools & Reviews' ? '🛠️' : '📸'}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium glass">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-semibold mb-2 group-hover:text-accent-500 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-secondary line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: post.author },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Snap2Do AI',
      url: BASE_URL,
    },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-secondary ml-6 mb-2">{line.slice(2)}</li>;
      }
      if (line.match(/^\d+\. /)) {
        return <li key={i} className="text-secondary ml-6 mb-2 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      }
      if (line.trim() === '') {
        return <div key={i} className="h-4" />;
      }
      return <p key={i} className="text-secondary leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <>
      <SEO
        title={`${post.title} | Snap2Do AI Blog`}
        description={post.excerpt}
        canonical={`${BASE_URL}/blog/${post.slug}`}
        keywords={post.keywords}
        ogType="article"
        structuredData={structuredData}
      />

      <div className="pt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-sm text-muted mb-6">
            <Link to="/" className="hover:text-accent-500">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-accent-500">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary">{post.title}</span>
          </nav>

          <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-500/10 text-accent-500">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-8 pb-8 border-b">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readingTime} min read
            </span>
          </div>

          <div className="mb-8">
            <p className="text-lg text-secondary font-medium mb-6">{post.excerpt}</p>
            <div className="prose-content">{renderContent(post.content)}</div>
          </div>

          <div className="card p-6 my-12 bg-secondary">
            <h3 className="text-xl font-bold mb-3">Turn Your Screenshots Into Tasks</h3>
            <p className="text-sm text-secondary mb-4">
              Upload a screenshot to Snap2Do AI and get an actionable task in seconds. Free, no login required.
            </p>
            <Link to="/#analyze" className="btn-primary text-sm">
              Try Snap2Do AI Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="card p-4 hover:border-accent-500/30 transition-all group"
                  >
                    <p className="text-xs text-muted mb-2">{rp.category}</p>
                    <h4 className="text-sm font-semibold group-hover:text-accent-500 transition-colors line-clamp-2">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-muted mt-2">{rp.readingTime} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent-500 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
