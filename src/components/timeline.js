import Skeleton from "react-loading-skeleton";
import react from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
    const { photos } = usePhotos();

    // console.log('ph', photos.length );
    // photo is currently null
    
    return (
        <div className="container col-span-2">
            { !photos ? (
                <Skeleton count={4} width={640} height={600} className="mb-5" />
            ) : photos.length > 0 ? (
                // photos.map((content) => <p key={content.docId}> { content.imageSrc } </p>)
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : (
                <p className="text-center text-2xl"> Follow people to see something!</p>
            )} what the fuck
        </div>
    );
}