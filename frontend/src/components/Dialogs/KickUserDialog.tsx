import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { KickUsers } from "@/wailsjs/go/main/App";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface KickUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  names: string[];
}

export function KickUserDialog({ isOpen, onClose, names }: KickUserDialogProps) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");

  const handleBan = () => {
    onClose();

    KickUsers(names, reason);
  };

  useEffect(() => {
    setReason("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[28rem]">
        <DialogHeader>
          <DialogTitle>
            {names.length > 1
              ? t("admin_panel.tabs.players.dialogs.kickuser.title_multiple")
              : t("admin_panel.tabs.players.dialogs.kickuser.title")}
          </DialogTitle>
          <DialogDescription>
            <p>{t("admin_panel.tabs.players.dialogs.kickuser.players", { players: names.join(", ") })}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Label htmlFor="kick-reason" className="text-right">
            {t("admin_panel.tabs.players.dialogs.kickuser.reason")}
          </Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value.replace(/[\\"'\n\r]/g, ""))}
            id="kick-reason"
            placeholder={t("admin_panel.tabs.players.dialogs.kickuser.reason_placeholder")}
            className="col-span-3 max-h-64"
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBan}>
            {t("admin_panel.tabs.players.dialogs.kickuser.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
