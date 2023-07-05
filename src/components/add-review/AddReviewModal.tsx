"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import getFirstWord from "@/helpers/string/getFirstWord";
import SuccessMessage from "../alerts/SuccessMessage";
import successMessages from "@/utils/messages/successMessages";
import Notification from "../notification/Notification";

type Props = { userDisplayName: string };

function AddReviewModal({ userDisplayName }: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="h-full w-full rounded-2xl bg-gray-200 px-4 text-start text-gray-500"
      >
        Want to review a movie, {getFirstWord(userDisplayName)}?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={searchInputRef}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto transform rounded-md bg-white p-4 pt-2 text-left align-middle shadow-xl transition-all">
                  <AddReviewForm
                    closeModal={closeModal}
                    ref={searchInputRef}
                    setIsSuccess={setIsSuccess}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Notification visible={isSuccess} setIsVisible={setIsSuccess}>
        <SuccessMessage message={successMessages.review} />
      </Notification>
    </>
  );
}

export default AddReviewModal;
