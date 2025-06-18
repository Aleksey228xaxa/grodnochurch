import { QuestionsFormClient } from "./Forms";
import NeedsText from "./Text";



export default function QuestionsSection() {
  return <QuestionsFormClient textContent={<NeedsText/>} />
}
