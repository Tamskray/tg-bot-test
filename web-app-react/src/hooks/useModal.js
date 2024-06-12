import { useState, useEffect } from "react";

export const useModal = () => {
  const [open, setIsOpen] = useState(false);

  const openModalHandler = () => setIsOpen(true);

  const closeModalHandler = () => setIsOpen(false);

  // no scroll not useful shit, but works
  useEffect(() => {
    if (open) {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        document.documentElement.classList.add("noscroll");
        document.documentElement.style.top = -scrollTop + "px";
      }
    } else {
      let scrollTop = parseInt(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("top")
      );
      document.documentElement.classList.remove("noscroll");
      window.scrollTo(0, -scrollTop);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModalHandler();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { open, onOpen: openModalHandler, onClose: closeModalHandler };
};
