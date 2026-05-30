import { Zap } from "lucide-react";

const Tag = ({
  title,
  showIcon = true,
}: {
  title: string;
  showIcon?: boolean;
}) => {
  return (
    <div className="inline-flex items-center gap-1 md:gap-2 tag-pill rounded-full px-3 py-1.5 text-[10px] md:text-xs font-medium mb-6 animate-fade-in">
      {showIcon && <Zap size={11} />}
      {title}
    </div>
  );
};

export default Tag;
