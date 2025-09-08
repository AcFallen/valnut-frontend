"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteUserButtonProps {
  onDelete: () => void;
}

export function DeleteUserButton({ onDelete }: DeleteUserButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={onDelete} color="danger">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent color="danger">
        <p>Eliminar usuario</p>
      </TooltipContent>
    </Tooltip>
  );
}
