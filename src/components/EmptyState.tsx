
import { Ghost } from "lucide-react";

export const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
      <Ghost className="w-12 h-12 mb-4 opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
