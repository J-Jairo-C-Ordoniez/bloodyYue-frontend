import StoryTray from '../molecules/StoryTray';
import FeedPost from './FeedPost';
import Form from '../molecules/Form'; // Assuming we might want a "Create Post" input at some point, but for now sticking to design.

export default function ProfileFeed() {
    const stories = [
        { image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', username: 'bloody.yue', hasStory: true },
        { image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', username: 'art.daily', isLive: true },
        { image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', username: 'concept_z', hasStory: true },
        { image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', username: 'sketchy', hasStory: true },
        { image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', username: 'pixel_art', hasStory: false },
    ];

    const posts = [
        {
            id: 1,
            user: {
                name: 'bloody.yue',
                avatar: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp',
                radius: '2h ago',
                role: 'Digital Art',
                isVerified: true
            },
            time: '2h ago',
            tags: ['reset', 'abstract'],
            image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', // Placeholder for "Neon Portrait"
            title: 'Neon Dreams',
            content: 'Feeling inspired by neon lights today! What do you think of this color palette? 🎨✨',
            stats: { likes: '1.2k', comments: 45 }
        },
        {
            id: 2,
            user: {
                name: 'bloody.yue',
                avatar: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp',
                radius: '5h ago',
                role: 'Commission',
                isVerified: true
            },
            time: '5h ago',
            tags: ['chibi', 'commission'],
            image: 'https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp', // Placeholder for "Anime Girl"
            title: 'Chibi Commission',
            content: 'Chibi commission for a lovely client ❤️',
            stats: { likes: '650', comments: 23 }
        }
    ];

    return (
        <div className="flex flex-col space-y-6 max-w-2xl mx-auto w-full">
            {/* Stories */}
            <StoryTray stories={stories} />

            {/* Posts */}
            <div>
                {posts.map(post => (
                    <FeedPost key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
}
