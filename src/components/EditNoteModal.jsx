import { Modal } from "@mui/material";
import React from "react";

function EditNoteModal({ open, setOpen }) {

  // ✅ FIX: proper close handler
  const handleClose = () => {
    setOpen(false);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex px-6 bg-transparent flex-col items-center pb-16">
        <form className="mt-6 w-1/2 max-lg:w-full space-y-4 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8 bg-gray-100">

          {/* Title */}
          <div>
            <label htmlFor="title">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 text-sm"
              placeholder="Enter notes title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full mt-2 border-2 outline-none rounded-lg border-gray-200 p-4 text-sm"
              placeholder="Enter notes description"
            />
          </div>

          {/* Tag */}
          <div>
            <label htmlFor="tag">Tag</label>
            <input
              id="tag"
              name="tag"
              type="text"
              className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 text-sm"
              placeholder="Enter notes tag"
            />
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium">Attachments</label>
            <input
              type="file"
              name="files"
              className="mt-2 px-3 py-6 border-2 border-dashed rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex mt-5 justify-between gap-5">
            <button
              type="button"
              onClick={handleClose} // ✅ FIX HERE
              className="rounded-lg bg-rose-600 px-5 py-3 text-sm text-white"
            >
              Discard
            </button>

            <button
              type="submit"
              className="rounded-lg bg-rose-900 px-5 py-3 text-sm text-white"
            >
              Update Notes
            </button>
          </div>

        </form>
      </div>
    </Modal>
  );
}

export default EditNoteModal;