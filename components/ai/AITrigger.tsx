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
        className={`fixed right-3 z-[70] inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-4 py-3 font-heading text-sm font-bold text-white shadow-[0_14px_35px_rgba(26,12,112,0.28)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-5 sm:bottom-5 ${
          campaignVisible ? "bottom-24" : "bottom-4"
        }`}
      >
        <AILogo size={30} decorative className="size-7 ring-1 ring-white/35" />
        Ask medhaup AI
      </button>
    );
  },
);

export default AITrigger;
