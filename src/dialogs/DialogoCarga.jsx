import { Dialog, DialogContent, CircularProgress } from "@mui/material";

const DialogoCarga = ({ open }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { backgroundColor: "transparent", boxShadow: "none" },
      }}
    >
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default DialogoCarga;
