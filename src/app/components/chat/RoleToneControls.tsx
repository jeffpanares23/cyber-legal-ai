"use client";

import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  role: string;
  onRoleChange: (r: string) => void;
  tone: string;
  onToneChange: (t: string) => void;
}

const RoleToneControls: FC<Props> = ({
  role,
  onRoleChange,
  tone,
  onToneChange,
}) => (
  <div className="w-full flex flex-col sm:flex-row gap-3 mb-3">
    {/* ROLE */}
    <Select value={role} onValueChange={onRoleChange}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        {["Neutral", "Prosecutor", "Defendant", "Judge"].map((r) => (
          <SelectItem key={r} value={r.toLowerCase()}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* TONE */}
    <Select value={tone} onValueChange={onToneChange}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Tone" />
      </SelectTrigger>
      <SelectContent>
        {["Neutral", "Formal", "Conciliatory", "Aggressive"].map((t) => (
          <SelectItem key={t} value={t.toLowerCase()}>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default RoleToneControls;
