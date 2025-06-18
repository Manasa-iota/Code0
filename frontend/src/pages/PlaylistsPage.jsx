import React from "react";
import { useParams } from "react-router-dom";
import ProblemsPageSidebar from "../components/ProblemsPageSidebar";
import PlaylistDetails from "../components/PlaylistDetails";
import { useGetPlaylistByIdQuery } from "../querys/usePlaylistQuery";

const PlaylistsPage = () => {
  const { playlistId } = useParams();
  const { data, isPending, isError, error } = useGetPlaylistByIdQuery(playlistId);

  return (
    <div className="flex min-h-screen bg-base-100 text-base-content">
      <ProblemsPageSidebar />
      <PlaylistDetails
        playlist={data?.playlist}
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default PlaylistsPage;
