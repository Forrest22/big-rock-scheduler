import { Scheduler } from "./components/scheduler";

export default function App() {
  return (
    <Scheduler
      courseName="Big Rock Disc Golf"
      courseSubtitle="WATERBURY CENTER, VT · NON-MEMBER TEE TIMES · $10/ROUND"
      footerNote="Members may walk on at any time · Non-members must book & pay $10/round · Private land — no walk-ons"
      initialView="week"
    />
  );
}
