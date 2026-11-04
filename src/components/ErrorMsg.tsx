import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes err-in {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes err-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
        .err-card  { animation: err-in 0.32s cubic-bezier(0.34,1.1,0.64,1) both; }
        .err-pulse { animation: err-pulse 2.4s ease-in-out infinite; }
      `}</style>

      {/* Full-screen centering wrapper */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          className={`
            err-card relative overflow-hidden pointer-events-auto
            medical-card border border-destructive/30 bg-destructive/5
            px-4 py-3.5 flex items-start gap-3
            w-72
            transition-opacity duration-300
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* Left accent stripe */}
          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-destructive/70" />

          {/* Icon with pulsing halo */}
          <div className="relative mt-0.5 shrink-0 flex items-center justify-center">
            <span className="err-pulse absolute w-7 h-7 rounded-full bg-destructive/20" />
            <div className="relative z-10 w-7 h-7 rounded-full bg-destructive/15 border border-destructive/30 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
            </div>
          </div>

          {/* Text */}
          <div className="min-w-0 pl-1">
            <p className="text-sm font-semibold text-foreground leading-snug">
              Some thing went wrong
            </p>
            {/* <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {t('saveErrorDescription')}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;