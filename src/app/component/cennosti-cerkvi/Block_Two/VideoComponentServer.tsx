
import { createClient } from "@/prismicio";
import { FilledLinkToMediaField } from "@prismicio/client";
import VideoPlayer from "./VideoCompanent";


export default async function VideoBlock() {
  const client = createClient();
  const doc = await client.getSingle("church_values");
  
  const video = doc.data.video as FilledLinkToMediaField;

  if (!video?.url) return null;

  return <VideoPlayer videoUrl={video.url} />;
}
