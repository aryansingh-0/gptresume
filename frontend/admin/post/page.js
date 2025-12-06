'use client';
import { useEffect, useRef, useState } from 'react';
import BlockEditor from '@/components/blog/BlockEditor';
import BlockRenderer from '@/components/blog/BlockRenderer';
import SubmitPopup from '@/components/admin/SubmitPopup';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const emptyBlock = [{ type: 'paragraph', value: '', level: 1, items: [] }];

function Page() {
    const [showPopup, setShowPopup] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [expiredAt, setexpiredAt] = useState('')
    const [tags, setTags] = useState([]);
    const [isPublish, setIsPublish] = useState(false)
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([...emptyBlock]);
    const [editIndex, setEditIndex] = useState(null);
    const [autoFocusField, setAutoFocusField] = useState(null);
    const [isopitonOpen, setisopitonOpen] = useState(false);
    const isOpenRef = useRef(isopitonOpen);
    const altInputRef = useRef(null);
 
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
                    emptyBlock={emptyBlock}
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
                blocks={blocks}
                block={block}
                setBlocks={setBlocks}
                index={index}
                setEditIndex={setEditIndex}
            />
        );

    };



    const handleSubmit = () => {
        if (!title.trim() || blocks.length === 0) {
            alert('Title and content cannot be empty!');
            return;
        }

        const firstImageBlock = blocks.find(block => block.type === 'image' && block.value);
        if (firstImageBlock) {
            setThumbnailUrl(firstImageBlock.value);
        }

        setShowPopup(true); // Show metadata modal
    };


    const submitWithMetadata = async () => {
        const cleanedBlocks = blocks.filter(block => {
            if (!block.value || block.value.trim() === '') return false;
            if (block.type === 'list' && (!block.items || block.items.length === 0)) return false;
            return true;
        });

        if (cleanedBlocks.length === 0) {
            alert('All content blocks are empty or invalid!');
            return;
        }

        const payload = {
            title,
             slug : title
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove all non-word characters (except space and dash)
                .replace(/\s+/g, '-'),  // Replace spaces with dash

            author: 'Admin',
            tags,


            thumbnailUrl,
            content: cleanedBlocks,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublished: isPublish,
            expiredAt: expiredAt ? new Date(Date.now() + 1000 * 60 * 60 * expiredAt) : null,
        };

        try {
            const res = await fetch('/api/blog/save-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                alert('Article saved successfully!');
                setShowPopup(false); // close popup
            } else {
                alert('Failed to save article.');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting article.');
        }
    };


    return (
        <div className="max-w-3xl min-h-screen mx-auto px-4 py-6">
            {showPopup && (
                <SubmitPopup
                    show={showPopup}
                    setexpiredAt={setexpiredAt}
                    expiredAt={expiredAt}
                    onClose={() => setShowPopup(false)}
                    onSubmit={submitWithMetadata}
                    thumbnailUrl={thumbnailUrl}
                    setThumbnailUrl={setThumbnailUrl}
                    tags={tags}
                    isPublish={isPublish}
                    setIsPublish={setIsPublish}
                    setTags={setTags}
                />
            )}
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
                onClick={handleSubmit}
                className="mt-6 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Save Draft
            </button>
        </div>
    );
}

export default Page;
