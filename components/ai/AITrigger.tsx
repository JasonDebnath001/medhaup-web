import { forwardRef } from "react";
import AILogo from "./AILogo";

type AITriggerProps = {
  campaignVisible: boolean;
  onClick: () => void;
};

const AITrigger = forwardRef<HTMLButtonElement, AITriggerProps>(
  function AITrigger({ campaignVisible, onClick }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-label="Ask medhaup AI"
        className={`fixed right-3 z-[45] grid size-12 place-items-center rounded-full bg-navy text-white shadow-[0_12px_30px_rgba(26,12,112,0.25)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-5 sm:bottom-5 sm:inline-flex sm:size-auto sm:min-h-12 sm:gap-2 sm:px-4 sm:py-3 ${
          campaignVisible ? "bottom-24" : "bottom-4"
        }`}
      >
        <AILogo size={30} decorative className="size-7 ring-1 ring-white/35" />
        <span className="hidden sm:inline">Ask medhaup AI</span>
      </button>
    );
  },
);

export default AITrigger;
