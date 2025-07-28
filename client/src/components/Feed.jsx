import React, { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import usePicStore from '../stores/picStore';

const PicItem = ({ pic }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
    <img src={pic.display_url} alt={pic.title} className="w-full h-auto group-hover:opacity-80 transition-opacity" />
    <div className="p-4">
      <h4 className="font-bold text-lg truncate">{pic.title}</h4>
      <p className="text-sm text-gray-400">by {pic.user.username}</p>
    </div>
  </div>
);

function Feed() {
  const { pics, isLoading, fetchPics } = usePicStore();

  useEffect(() => {
    fetchPics();
  }, [fetchPics]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (isLoading && pics.length === 0) return <p className="text-center">Loading feed...</p>;

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {pics.map((pic) => (
        <div key={pic._id} className="mb-4">
            <PicItem pic={pic} />
        </div>
      ))}
    </Masonry>
  );
}

export default Feed;