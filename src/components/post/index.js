import propTypes from "prop-types";
import { useRef } from "react";
import Image from "./img";
import Actions from "./action";
import Footer from "./footer";
import Comments from "./comment";
import AddComment from "./add-comment";
import Header from "./header";

export default function Post(content) {
    // console.log(content.content);
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    // console.log('c', content);
    // return <p>pst post</p>;
    
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={content.content.username} />
            <Image src={content.content.imageSrc} caption={content.content.caption} />
            <Actions 
                docId={content.content.docId}
                totalLikes={content.content.likes.length}
                likedPhoto={content.content.userLikedPhotos}
                handleFocus={handleFocus} />
            <Footer caption={content.content.caption} username={content.content.username} />
            <Comments 
                docId={content.content.docId}
                comments={content.content.comments}
                posted={content.content.dateCreated}
                commentInput={commentInput} 
            />
        </div>
    );
}

Post.propTypes = {
    content: propTypes.shape({
        username: propTypes.string.isRequired,
        imageSrc: propTypes.string.isRequired,
        caption: propTypes.string.isRequired,
        docId: propTypes.string.isRequired,
        userLikedPhotos: propTypes.bool,
        likes: propTypes.array.isRequired,
        comments: propTypes.array.isRequired,
        dateCreated: propTypes.number.isRequired
    })
};