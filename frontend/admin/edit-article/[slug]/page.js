'use client';
import { useEffect, useRef, useState } from 'react';
import BlockEditor from '@/components/blog/BlockEditor';
import BlockRenderer from '@/components/blog/BlockRenderer';
import { useParams } from 'next/navigation';
import SubmitPopup from '@/components/admin/SubmitPopup';
import { toast } from 'react-hot-toast';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const emptyBlock = [{ type: 'paragraph', value: '', level: 1, items: [] }];

function Page() {

  const [id, setId] = useState("")
  const [title, setTitle] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [blocks, setBlocks] = useState([{ ...emptyBlock }]);
  const [editIndex, setEditIndex] = useState(null);
  const [autoFocusField, setAutoFocusField] = useState(null);
  const [isopitonOpen, setisopitonOpen] = useState(false);
  const isOpenRef = useRef(isopitonOpen);
  const altInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const params = useParams();
  const [isPublish, setIsPublish] = useState(false)
  let slug = params?.slug;
  const tagInputValue = tags.join(', ');


  useEffect(() => {
    if (!slug) return; // Don't fetch unless slug exists

    const fetchArticle = async () => {


      try {
        const res = await fetch(`/api/blog/${slug}`);

        const post = await res.json();

        const article = post.article;

        if (!article) {

          console.error('Article not found');
          setNotFound(true); // Use this to conditionally render later
          
          
          return;
        }

        setId(article._id); // Assuming you have setId state
        setTitle(article.title);
        setBlocks(article.content);
        setThumbnailUrl(article.thumbnailUrl);
        setTags(article.tags);
        setIsPublish(article.isPublished);
      } catch (err) {
        console.error('Error fetching article:', err);
        setNotFound(true);
      }
    };

    fetchArticle();
  }, [slug]);

 const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status]);
  useEffect(() => {
    isOpenRef.current = isopitonOpen;
  }, [isopitonOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        if (isOpenRef.current) {

          setisopitonOpen(false);
        } else {

          setisopitonOpen(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const renderBlock = (block, index) => {
    const isEditing = editIndex === index;
    const shouldAutoFocus = autoFocusField === index;

    if (isEditing) {
      return (
        <BlockEditor
          block={block}
          index={index}
          blocks={blocks}
          setBlocks={setBlocks}
          isEditing={isEditing}
          autoFocusField={autoFocusField}
          setEditIndex={setEditIndex}
          setisopitonOpen={setisopitonOpen}
          isopitonOpen={isopitonOpen}
          setAutoFocusField={setAutoFocusField}
          altInputRef={altInputRef}

        />
      );
    }


    // Preview mode (non-editing)
    return (
      <BlockRenderer
        block={block}
        index={index}
        setEditIndex={setEditIndex}
      />
    );

  };

  const beforeHandleSubmit = async () => {
    if (!title.trim() || blocks.length === 0) {
      toast.error('Title and content cannot be empty!');
      return;
    }
    setShowPopup(true); // Show metadata modal
  }

  const handleSubmit = async () => {
    if (!title.trim() || blocks.length === 0) {
      alert('Title and content cannot be empty!');
      return;
    }
    const cleanedBlocks = blocks.filter(block => {
      if (!block.value || block.value.trim() === '') return false;
      if (block.type === 'list' && (!block.items || block.items.length === 0)) return false;
      return true;
    });

    if (cleanedBlocks.length === 0) {
      toast.error('All content blocks are empty or invalid!');
      return;
    }

    const payload = {
      title: title.trim(),
     slug : title
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove all non-word characters (except space and dash)
                .replace(/\s+/g, '-'),  // Replace spaces with dash

      author: 'Admin',
      tags,
      thumbnailUrl: thumbnailUrl,
      content: cleanedBlocks,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: isPublish,
    };

    try {
      const res = await fetch('/api/blog/save-article', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success('Article updated successfully!');
      } else {
        alert.error('Failed to save article.');
      }
    } catch (err) {
      console.error(err);
      alert.error('Error submitting article.');
      
    } finally{
      setShowPopup(false);
    }
  };


  return (
    <div className="max-w-3xl min-h-screen mx-auto px-4 py-6">

      {showPopup && (
        <SubmitPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmit}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        tags={tags}
        setIsPublish={setIsPublish}
        isPublish={isPublish}
        setTags={setTags}
      />
      )}


      {notFound ? (
        <div className="h-screen flex items-center justify-center text-center">
          <h1 className="text-2xl font-bold">No {slug} article found</h1>
        </div>
      ) : (
        <>
          <input
            className="text-4xl font-bold w-full mb-6 outline-none"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {blocks.map((block, index) => (
            <div key={index}>{renderBlock(block, index)}</div>
          ))}

          <button
            onClick={beforeHandleSubmit}
            className="mt-6 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update the Post
          </button>
        </>
      )}
    </div>
  );

}

export default Page;
