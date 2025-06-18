import { createClient } from "@/prismicio";
import VerticalTimelineProgress from "./Istoriya";


export default async function Blocks() {
  const client = createClient();
  const ChurchValues = await client.getSingle("history");
  const timeline = ChurchValues.data.block;

  return <VerticalTimelineProgress timeline={timeline} />;
}
